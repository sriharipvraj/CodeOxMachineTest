const mongoose = require("mongoose");

const todoDetails = mongoose.Schema({
  todoName: { type: String },
});

const todo = mongoose.model("todo", todoDetails);

module.exports = todo;
