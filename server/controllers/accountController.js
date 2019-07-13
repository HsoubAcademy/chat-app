/**
 * HttpErrors Module.
 */
const createError = require('http-errors');

/**
 * Update user profile.
 * @param req
 * @param res
 * @param next
 */
exports.profile = (req, res, next) => {
    // Get user from request
    const user = req.user;
    // Update user data
    user.name = req.body.name;
    user.about = req.body.about;
    user.avatar = req.file ? req.file.filename : user.avatar;
    user.save()
    .then(updated => {
        // Broadcast the profile changes to users.
        sendUpdateUser(updated);
        res.json();
    })
    .catch(next);
 };

/**
 * Broadcast the profile changes to users.
 * @param user
 */
const sendUpdateUser = (user) => {
    io.emit('update_user', user.getData());
};

/**
 * Change user password
 * @param req
 * @param res
 * @param next
 */
exports.password = (req, res, next) => {
    // Get old and new password from request.
    const { password, newPassword} = req.body;
    let user = req.user;
    // Check if password is wrong then create error.
    if (!user.checkPassword(password)){
        return next(createError(401, "كلمة المرور خاطئة"));
    }
    // Update password.
    user.password = newPassword;
    user.save().then(updated => res.json())
    .catch(next);
};
 
