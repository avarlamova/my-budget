const mongoose = require("mongoose");

const { Schema } = mongoose;

const expenseSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  amount: Number, //Decimal128
  category: String,
  colorCategory: String,
  //   attachment: {
  //     type: file,
  //     required: false,
  //   },
});

module.exports = mongoose.model("Expense", expenseSchema, "spendings");
