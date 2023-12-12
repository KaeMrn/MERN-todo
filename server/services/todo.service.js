// service.js
const todoRepository = require('../dao/todo.dao');

//Retrieves all todos for a specific user.
async function getAllTodos(userId) {
  return todoRepository.getAllTodos(userId);
}
//Creates a new todo item
async function createTodo(todolist) {
    // Setting creation and last modified dates to the current time.

  todolist.creationDate = new Date().getTime();
  todolist.lastModifiedDate = new Date().getTime();
    // send to the todoRepository to create the new todo item.

  return todoRepository.createTodo(todolist);
}

//Updates a todo item by its ID
async function updateTodoById(id, task, completed) {
  console.log({id, task, completed});
  return todoRepository.updateTodoById(id, task, completed);
}

//Deletes a todo item by its ID
async function deleteTodoById(id) {
  return todoRepository.deleteTodoById(id);
}


module.exports = {
  getAllTodos,
  createTodo,
  updateTodoById,
  deleteTodoById,
};