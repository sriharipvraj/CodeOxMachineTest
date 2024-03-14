const express = require("express");

const {
  todoFunction,
  editTodo,
  completedData,
  viewTodo,
} = require("../CONTROLLER/controller");

const router = express.Router();

router.route("/add").post(todoFunction);
router.route("/view").get(viewTodo);
router.route("/edit/:id").put(editTodo);
router.route("/completed/:id").get(completedData);

module.exports = router;
