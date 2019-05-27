/**
 * Create socket.io server as global.
 */
io = require('socket.io')();

/**
 * Authentication middleware.
 */
const auth = require('./middlewares/auth');

/**
 * Message Model.
 */
const Message = require('./models/message');

/**
 * User Mode.
 */
const User = require('./models/user');

/**
 * User statuses.
 */
const users = {};

/**
 * Add auth middleware to socket.io server.
 */
io.use(auth.socket);

/**
 * Handle new connections.
 */
io.on('connection', socket => {
    // Handle new connection event.
    onSocketConnected(socket);
    // Handle user-to-user message.
    socket.on('message', data => onMessage(socket, data));
    // Handle typing message event.
    socket.on('typing', receiver => onTyping(socket, receiver));
    // Handle message seen event.
    socket.on('seen', sender => onSeen(socket, sender));
    // Initialize user data after connection.
    initialData(socket);
    // Handle Socket disconnect event.
    socket.on('disconnect', () => onSocketDisconnected(socket));
});

/**
 * Handle new connection event.
 * @param socket
 */
const onSocketConnected = socket => {
    // Log socket.id to console.
    console.log('New client connected: ' + socket.id);
    // Add newly connected socket to user room.
    socket.join(socket.user.id);
    // Make user status online.
    users[socket.user.id] = true;
    // If this connection is the first one for user then broadcast user online to others.
    let room = io.sockets.adapter.rooms[socket.user.id];
    if(room.length === 1){
        io.emit('user_status', {
          [socket.user.id]: true  
        })
    }
};

/**
 * Handle socket disconnection.
 * @param socket
 */
const onSocketDisconnected = socket => {
    // If last connection for user then broadcast user last seen to others.
    let room = io.sockets.adapter.rooms[socket.user.id];
    if(!room || room.length < 1){
        let lastSeen = new Date().getTime();
        users[socket.user.id] = lastSeen;
        io.emit('user_status', {
            [socket.user.id]: lastSeen
        });
    }
    // Log user disconnected to console.
    console.log('Client disconnected: ' + socket.user.username);
};

/**
 * Handle user-to-user message event.
 * @param socket
 * @param data
 */
const onMessage = (socket, data) => {
    // Get sender id.
    let sender = socket.user.id;
    // Get receiver id.
    let receiver = data.receiver;
    // Make message object.
    let message = {
        sender: sender, receiver: receiver, content: data.content, date: new Date().getTime()
    };
    // Add message to database.
    Message.create(message);
    // Send message to receiver and sender applications (browsers or windows).
    socket.to(receiver).to(sender).emit('message', message);
};

/**
 * Handle typing message event.
 * @param socket
 * @param receiver
 */
const onTyping = (socket, receiver) => {
    let sender = socket.user.id;
    socket.to(receiver).emit('typing', sender);
};

/**
 * Handle message seen event.
 * @param socket
 * @param sender
 */
const onSeen = (socket, sender) => {
    let receiver = socket.user.id;
    console.log({sender, receiver, seen: false});
    Message.updateMany({sender, receiver, seen: false}, {seen: true}, {multi: true}).exec();
};

/**
 * Get all user messages.
 * @param userId
 * @returns {Query}
 */
const getMessages = userId => {
    let where = [
        {sender: userId}, {receiver: userId}
    ];
    return Message.find().or(where);
};

/**
 * Get all users except the connected user.
 * @param userId
 * @returns {Query}
 */
const getUsers = userId => {
    let where = {
        _id: {$ne: userId}
    };
    return User.find(where).select('-password');
};

/**
 * Initialize user data after connection.
 * @param socket
 */
const initialData = socket => {
    let user = socket.user;
    let messages = [];
    getMessages(user.id)
    .then(data => {
        messages = data;
        return getUsers(user.id);
    })
    .then(contacts => {
        socket.emit('data', user, contacts, messages, users);
    })
    .catch(() => socket.disconnect());
};
