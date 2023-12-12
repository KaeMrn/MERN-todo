//@ts-check
const router = require('express').Router();
const todoService = require('../services/todo.service');


// Route for getting all todos for a user

router.get('/', async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(req.user, {userId})
    const todos = await todoService.getAllTodos(userId);
    res.json(todos); // Sending todos as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for creating a new todo list

router.post('/', async (req, res) => {
  const { name, todos } = req.body;
  
  if (!name || typeof name !== 'string') {
    return res.status(400).json({error: 'The todolist name is mandatory'});
  }
/*   if (!userId || typeof userId !== 'number') { // if you are logged in, you don't need to specify the user id
    return res.status(400).json({error: 'The userId is mandatory'});
  } */

    // Validating the request body

  if (!todos || !(todos instanceof Array)) {
    return res.status(400).json({error: 'The todos proeprty is mandatory'});
  }

  for (let i=0; i<todos.length; i++) {
    if (typeof todos[i].task !== 'string' || typeof todos[i].completed !== 'boolean') {
      return res.status(400).json({error: 'The todo with index ' + i + ' is not valid'});
    }
  }

  try {
        // Creating a new todo list

    const newTodo = await todoService.createTodo({
      name,
      userId: req.user.userId, // Getting userId from the request user object
      todos
    });
    res.status(201).json(newTodo); // Sending the created todo list as a response
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for updating a todo list by its ID

router.put('/:id', async (req, res) => {
  const todoId = req.params.id; // Extracting todoId from request parameters
  const userId = req.user.userId; // Extracting userId from request user object
  const { name, todos } = req.body; // Extracting name and todos from request body
  
  if (!name || typeof name !== 'string') {
    return res.status(400).json({error: 'The todolist name is mandatory'});
  }
  if (!userId) { // if you are logged in, you don't need to specify the user id
    return res.status(400).json({error: 'The userId is mandatory'});
  }
  if (!todos || !(todos instanceof Array)) {
    return res.status(400).json({error: 'The todos proeprty is mandatory'});
  }

  for (let i=0; i<todos.length; i++) {
    if (typeof todos[i].task !== 'string' || typeof todos[i].completed !== 'boolean') {
      return res.status(400).json({error: 'The todo with index ' + i + ' is not valid'});
    }
  }

  try {
        // Updating the todo list by ID

    const newTodo = await todoService.updateTodoById(todoId, {
      name,
      userId,
      todos
    }, false);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for deleting a todo list by its ID

router.delete('/:id', async (req, res) => {
  const todoId = req.params.id;
  // Extracting todoId from request parameters
  try {
    const newTodo = await todoService.deleteTodoById(todoId);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for updating a specific task in a todo list

router.put('/:todoListId/tasks/:taskId', async (req, res) => {
  const { todoListId, taskId } = req.params; // Extracting todoListId and taskId from request parameters
  const taskUpdate = req.body; // Extracting task update details from request body

  try {
        // Updating the specific task in the todo list

    const updatedList = await todoService.updateTaskInList(todoListId, taskId, taskUpdate);
    res.json(updatedList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = {router};