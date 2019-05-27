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
const controller = require('../controllers/authController');

/**
 * [POST] Login request.
 */
router.post('/', controller.login);

/**
 * [POST] Register request.
 */
router.post('/register', controller.register);

/**
 * Export router.
 */
module.exports = router;