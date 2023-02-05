// const User = require('../model/User');
const getFilters = async (req, res) => {
  const { month, year } = req.cookies;
  console.log("getFilters");
  if ((!month, year)) return res.status(204).json({ message: "No filters" });
  res.status(200).json({ month, year });
};

module.exports = { getFilters };
