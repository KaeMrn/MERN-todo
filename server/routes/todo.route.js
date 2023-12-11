//@ts-check
const router = require('express').Router();
const todoService = require('../services/todo.service');

router.get('/', async (req, res) => {
  try {
    const todos = await todoService.getAllTodos();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { name, userId, todos } = req.body;
  
  if (!name || typeof name !== 'string') {
    return res.status(400).json({error: 'The todolist name is mandatory'});
  }
  if (!userId || typeof userId !== 'number') { // if you are logged in, you don't need to specify the user id
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
    const newTodo = await todoService.createTodo({
      name,
      userId,
      todos
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  const todoId = req.params.id;
  const { name, userId, todos } = req.body;
  
  if (!name || typeof name !== 'string') {
    return res.status(400).json({error: 'The todolist name is mandatory'});
  }
  if (!userId || typeof userId !== 'number') { // if you are logged in, you don't need to specify the user id
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


module.exports = {router};