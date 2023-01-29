const express = require("express");
const router = express.Router();
const expensesController = require("../controllers/expensesController");
const authController = require("../controllers/authController");

router.get("/", expensesController.getUserExpenses);
// router.post('/', authController.handleLogin);

// router.route('/:id')
//     .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

module.exports = router;
