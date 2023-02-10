const getFilters = async (req, res) => {
  const { month, year } = req.cookies;
  if (!month && !year) return res.status(204).json({ message: "No filters" });
  res.status(200).json({ month, year });
};

const setFilters = async (req, res) => {
  const { month, year } = req.body;
  if (!month && !year) return res.status(204).json({ message: "No filters" });
  res.cookie("year", year, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.cookie("month", month, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  res.status(200).json({ success: "Filters set" });
};

module.exports = { getFilters, setFilters };
