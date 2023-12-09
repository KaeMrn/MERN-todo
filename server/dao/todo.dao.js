const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
  name: String,
  userId: Number,
  creationDate: Number,
  lastModifiedDate: Number,
  todos: [{
    task: String,
    completed: Boolean
  }]
})

const TodoList = mongoose.model('TodoList', todoListSchema);

async function getAllTodos() {
  console.log('getAllTodos')
  return TodoList.find();
}

async function createTodo(todolist) {

  const newTodo = new TodoList(todolist);
  return newTodo.save();
}

async function updateTodoById(id, task, completed) {
  return TodoList.findByIdAndUpdate(id, task, { new: true });
}

async function deleteTodoById(id) {
  return TodoList.findByIdAndDelete(id);
}

module.exports = {
  getAllTodos,
  createTodo,
  updateTodoById,
  deleteTodoById,
};