// const User = require('../model/User');
const Expense = require("../model/Expense");
const getUserExpenses = (req, res) => {
  console.log(req);
  if (!req?.params?.login)
    return res.status(400).json({ message: "User login required" });
  //   const user = await Expense.findOne({ username: req.params.login }).exec();
  if (!user) {
    return res.status(204).json({ message: `User ${req.params.id} not found` });
  }
  res.json(user);
};

// const getUser = (req, res) => {
//   res.json({
//     id: req.body.id,
//   });
// };

// const createUser = (req, res) => {
//   res.json({
//     username: req.body.username,
//     password: req.body.password,
//   });
// };

// const deleteUser = (req, res) => {
//   res.json({
//     id: req.body.id,
//   });
// };

module.exports = { getUserExpenses };
