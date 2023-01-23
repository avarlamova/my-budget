const data = {};
data.employees = require("../model/employees.json");

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const getUser = (req, res) => {
  res.json({
    id: req.body.id,
  });
};

const createUser = (req, res) => {
  res.json({
    username: req.body.username,
    password: req.body.password,
  });
};

const deleteUser = (req, res) => {
  res.json({
    id: req.body.id,
  });
};

module.exports = { createUser, createUser, deleteUser, getUser };
