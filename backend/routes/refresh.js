const express = require("express");
const router = express.Router();

// issues new access token
const refreshTokenController = require("../controllers/refreshTokenController");

router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
