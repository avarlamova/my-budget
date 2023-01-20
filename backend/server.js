require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3001;

// Connect to MongoDB
// connectDB();
app.use(cors());
app.use(express());
// built-in middleware for json
app.use(express.json());

app.use(cookieParser());
//static data
app.use("/", express.static(path.join(__dirname, "/public")));
// mongoose.connection.once("open", () => {
//   console.log("Connected to MongoDB");
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
