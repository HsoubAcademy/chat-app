/**
 * Express Module.
 */
const express = require('express');

/**
 * Router Module.
 */
const router = express.Router();

/**
 * Controller Module.
 */
const controller = require('../controllers/accountController');

/**
 * Auth Middleware.
 */
const auth = require('../middlewares/auth');

/**
 * Path Module.
 */
const path = require('path');

/**
 * Multer Module.
 */
const multer  = require('multer');

/**
 * Handel multipart/form-data.
 */
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

/**
 * User profile middleware.
 */
const upload = multer({
    limits: { fileSize: 1024 * 1024 },
    storage: storage ,
    fileFilter: (req, file, cb) => {
        let fileTypes = /jpeg|jpg|png/;
        let mimeType = fileTypes.test(file.mimetype);
        let extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extname)  return cb(null, true);
        cb(new Error('غبر مسموح رفع هذا الملف'));
    },
});

/**
 * [POST] update profile.
 */
router.post('/', [auth.authenticated, upload.single('avatar')], controller.profile);

/**
 * [POST] Change password.
 */
router.post('/password', auth.authenticated, controller.password);

/**
 * Export router.
 */
module.exports = router;