const todo = require("../MODEL/schema");

//ADDING TODO LIST

const todoFunction = async (req, res) => {
  const { todoName } = req.body;

  const todoInfo = await todo.create({
    todoName,
  });
  res.json(todoInfo);
};

const viewTodo = async (req, res) => {
  const viewData = await todo.find();
  res.send(viewData);
};

//EDITING TODO
const editTodo = async (req, res) => {
  const { todoName } = req.body;
  const _id = req.params.id;
  const edit = await todo.findByIdAndUpdate(_id, { todoName });
  res.json(edit);
};

//GETTING DATA

const completedData = async (req, res) => {
  const _id = req.params.id;
  const getById = await todo.findById({ _id });
  res.send(getById);
};

module.exports = { todoFunction, editTodo, completedData, viewTodo };
