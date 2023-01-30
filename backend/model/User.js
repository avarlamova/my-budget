const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    roles: {
      User: {
        type: Number,
        default: 2005,
      },
      Editor: Number,
      Admin: Number,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: [String],
  }
  // { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
