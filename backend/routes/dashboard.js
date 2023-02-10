const express = require("express");
const router = express.Router();
const expensesController = require("../controllers/expensesController");
const filtersController = require("../controllers/filtersController");

router.post("/", expensesController.getUserExpenses);
router.get("/filters", filtersController.getFilters);
router.post("/filters", filtersController.setFilters);
// router.route('/:id')
//     .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

module.exports = router;
