const express = require("express");

const staticMiddlware = express.static("build/");

module.exports = staticMiddlware;
