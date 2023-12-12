const mongoose = require('mongoose');

// Defining the schema for a todo list

const todoListSchema = new mongoose.Schema({
  name: String,
  userId: String,
  creationDate: Number,
  lastModifiedDate: Number,
  todos: [{
    task: String,
    completed: Boolean
  }]
})
// Creating a model from the schema to interact with the 'TodoList' collection in MongoDB
const TodoList = mongoose.model('TodoList', todoListSchema);

// Async function to retrieve all todo lists for a specific user

async function getAllTodos(userId) {
  console.log('getAllTodos')
  return TodoList.find({userId: userId});
}

// Async function to create a new todo list

async function createTodo(todolist) {
// Associate the todo with the provided userId
  const newTodo = new TodoList({ ...todolist });
  return newTodo.save();
}

// Async function to update a todo list by its ID

async function updateTodoById(id, task, completed) {
  return TodoList.findByIdAndUpdate(id, task, { new: true });
}

// Async function to delete a todo list by its ID

async function deleteTodoById(id) {
  return TodoList.findByIdAndDelete(id);
}

// Async function to update a specific task within a todo list

async function updateTaskInList(todoListId, taskId, updatedTask) {
  const todoList = await TodoList.findById(todoListId);
  if (!todoList) {
    throw new Error('TodoList not found');
  }

  const taskIndex = todoList.todos.findIndex(task => task._id.toString() === taskId);
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }

  todoList.todos[taskIndex] = { ...todoList.todos[taskIndex], ...updatedTask };
  await todoList.save();

  return todoList;
}



module.exports = {
  updateTaskInList,
  getAllTodos,
  createTodo,
  updateTodoById,
  deleteTodoById,
};