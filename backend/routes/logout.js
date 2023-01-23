const express = require("express");
const router = express.Router();

// issues new access token
const logoutController = require("../controllers/logoutController");

router.get("/", logoutController.handleLogout);

module.exports = router;
