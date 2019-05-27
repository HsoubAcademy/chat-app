/**
 * User Model.
 */
const User = require('../models/user');

/**
 * HttpErrors Module.
 */
const createError = require('http-errors');

/**
 * Login.
 * @param req
 * @param res
 * @param next
 */
exports.login = (req, res, next) => {
    // Get username and password from request.
    const { username, password } = req.body;
    // Find user by username.
    User.findOne({username}).then(user => {
        // if user not found or password is wrong then create error.
        if(!user || !user.checkPassword(password)){
            throw createError(401, 'الرجاء التحقق من اسم المستخدم وكلمة المرور');
        }
        // Generate user token.
        res.json(user.signJwt());
    })
    .catch(next);
};

/**
 * Register.
 * @param req
 * @param res
 * @param next
 */
exports.register = (req, res, next) => {
    // Get name, username and password from request.
    let data = { name, username, password } = req.body;
    // Check if username already exist.
    User.findOne({username})
    .then(user => {
        // if username already exist then create error.
        if(user) throw createError(422, "اسم المستخدم موجود مسبقاً");
        // Create new user.
        return User.create(data);
    })
    .then(user => {
        // Generate user token.
        res.json(user.signJwt());
        // Broadcast created user profile to users.
        sendNewUser(user);
    })
    .catch(next);
};

/**
 * Broadcast created user profile to users.
 * @param user
 */
const sendNewUser = user => {
    let data = { name, username, avatar } = user;
    io.emit('new_user', data);
};