const express = require("express");
const router = express.Router();

// all logic handling authentification
const authController = require('../controllers/authController');

// use 'handle login' from authController file for post requests
router.post('/', authController.handleLogin);

module.exports = router;
