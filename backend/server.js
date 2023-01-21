// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./config/errorHandler");

const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3001;

// Connect to MongoDB
// connectDB();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
// built-in middleware for json
app.use(express.json());

// app.use(cookieParser());
// mongoose.connection.once("open", () => {
//   console.log("Connected to MongoDB");
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });
app.use("/auth", require("./routes/auth"));
app.use("/empl", require("./routes/emp"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.use(errorHandler);
