// service.js
const todoRepository = require('../dao/todo.dao');

async function getAllTodos() {
  return todoRepository.getAllTodos();
}

async function createTodo(todolist) {
  todolist.creationDate = new Date().getTime();
  todolist.lastModifiedDate = new Date().getTime();
  return todoRepository.createTodo(todolist);
}

async function updateTodoById(id, task, completed) {
  console.log({id, task, completed});
  return todoRepository.updateTodoById(id, task, completed);
}

async function deleteTodoById(id) {
  return todoRepository.deleteTodoById(id);
}


module.exports = {
  getAllTodos,
  createTodo,
  updateTodoById,
  deleteTodoById,
};