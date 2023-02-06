// const User = require('../model/User');
const Expense = require("../model/Expense");
const getUserExpenses = async (req, res) => {
  const { user } = req.body;
  console.log("username is", user);
  console.log(req);
  if (!user) return res.status(400).json({ message: "User login required" });

  const expenses = await Expense.find({ username: req.body.user }).exec();
  if (!expenses) {
    return res.status(204).json({ message: `User ${user} not found` });
  }
  console.log(expenses);
  res.json(expenses);
};

module.exports = { getUserExpenses };
