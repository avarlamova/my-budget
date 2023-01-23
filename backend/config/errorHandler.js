const errorHandler = (err, res) => {
  console.error(err.stack);
  res.status(500).send(err.message);
  //   next();
};

module.exports = errorHandler;
