import React, { useState } from 'react';
import { addTodolist, getTodosByUser, updateTodolist } from '../services/todo.service';
import CustomButton from './CustomButton';

const TodoListContainer = () => {
    // Mock data
    const mockTodos = [
        {
            _id: '1',
            name: 'Personal',
            userId: 123,
            todos: [
                { task: 'Buy groceries', completed: false },
                { task: 'Call the bank', completed: false },
            ],
        },
        {
            _id: '2',
            name: 'Work',
            userId: 123,
            todos: [
                { task: 'Finish report', completed: false },
                { task: 'Attend meeting', completed: true },
            ],
        },
    ];

    const [todos, setTodos] = useState(mockTodos); // Initialize state with mock data
    const [newTodo, setNewTodo] = useState('');
    const [newTodoList, setNewTodoList] = useState('');

    const handleInputTodoChange = (event) => {
        setNewTodo(event.target.value);
    };

    const handleInputTodoListChange = (event) => {
        setNewTodoList(event.target.value);
    };

    const handleAddTodo = async (id) => {
        const todoList = todos.find(todo => todo._id === id);
        const newTodoObject = {
            ...todoList,
            todos: [...todoList.todos, {
                task: newTodo,
                completed: false
            }]
        };

        // Mock update (no actual API call)
        // await updateTodolist(null, { ...newTodoObject })

        setTodos([...todos.map(todo => todo._id === id ? newTodoObject : todo)]);
        setNewTodo('');
    };

    const handleAddTodoList = async () => {
        const todoList = {
            _id: Date.now().toString(), // Mock ID
            name: newTodoList,
            userId: 123,
            todos: []
        }

        // Mock add (no actual API call)
        // const newTodoListResponse = await addTodolist(null, { ...todoList })

        setTodos([...todos, todoList]);
        setNewTodoList('');
    };

    return (
        <div>
            <div className='w-full py-[4rem] bg-gray-200'>
                <input
                    type="text"
                    placeholder="Enter a new todo list"
                    value={newTodoList}
                    onChange={handleInputTodoListChange}
                />
                <CustomButton onClick={handleAddTodoList}>
                    Add Todo List
                </CustomButton>
                <ul className='py-4 flex flex-col justify-center'>
                    {todos.map((todo) => (
                        <React.Fragment key={todo._id}>
                            <li>{todo.name}</li>
                            <ul>
                                {todo.todos.map((el, index) => <li key={index}>{el.task}</li>)}
                            </ul>
                            <input
                                type="text"
                                placeholder="Enter a new task"
                                value={newTodo}
                                onChange={handleInputTodoChange}
                            />
                            <CustomButton onClick={() => handleAddTodo(todo._id)}>
                                Add Task
                            </CustomButton>
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoListContainer;
