require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./config/errorHandler");
const verifyJWT = require("./middlewares/verifyJWT");
const staticMiddlware = require("./middlewares/staticMiddlware.js");
const credentials = require("./middlewares/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection");

const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3001;

connectDB();

// BEFORE cors
app.use(credentials);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
// built-in middleware for json
app.use(express.json());

//static
app.use(staticMiddlware);

app.use(cookieParser());
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/register", require("./routes/register"));
app.use("/logout", require("./routes/logout"));
app.use("/dashboard", require("./routes/dashboard"));

app.use(errorHandler);
