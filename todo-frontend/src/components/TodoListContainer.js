import React, { useState } from 'react';
import { addTodolist, getTodosByUser, updateTodolist } from '../services/todo.service';
import CustomButton from './CustomButton';

const TodoListContainer = () => {
    // Mock data for testing
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
    const [newTodoList, setNewTodoList] = useState('');
    const [todoInputs, setTodoInputs] = useState({});


    const handleInputTodoChange = (id, value) => {
        setTodoInputs(prevInputs => ({
            ...prevInputs,
            [id]: value
        }));
    };

    const handleInputTodoListChange = (event) => {
        setNewTodoList(event.target.value);
    };

    const handleAddTodo = async (id) => {
        const newTask = todoInputs[id];
        if (!newTask) {
            // Handle empty input or show an error message
            return;
        }

        const todoList = todos.find(todo => todo._id === id);
        const newTodoObject = {
            ...todoList,
            todos: [...todoList.todos, {
                task: newTask,
                completed: false
            }]
        };


        setTodos([...todos.map(todo => todo._id === id ? newTodoObject : todo)]);
        // Clear the input field for this todo list
        setTodoInputs(prevInputs => ({
            ...prevInputs,
            [id]: ''
        }));
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

        setTodos([todoList,...todos]);
        setNewTodoList('');
    };
    const handleTaskCheckboxChange = (todoId, taskIndex, isChecked) => {
        setTodos(todos.map(todo => {
            if (todo._id === todoId) {
                const updatedTasks = todo.todos.map((task, index) => {
                    if (index === taskIndex) {
                        return { ...task, completed: isChecked };
                    }
                    return task;
                });
                return { ...todo, todos: updatedTasks };
            }
            return todo;
        }));
    };


    return (
        <div>
            <div className='w-full py-[4rem] bg-gray-200'>


                <ul className='py-4 flex flex-col justify-center items-center'>
                    {/*centering the "add new lists input bar" and making the enitre div the same width as the task cards by using justify-between  */}
                    <div className='newList w-full border border-gray-300 m-3 px-2 sm:w-3/4 md:w-1/2 lg:w-1/2 rounded-lg shadow-xl h-12
        flex flex-row justify-between items-center gap-2'>
                        <input
                            className="border h-10 p-2 w-3/4  rounded"
                            type="text"
                            placeholder="Enter a new todo list"
                            value={newTodoList}
                            onChange={handleInputTodoListChange}
                        />
                        <CustomButton onClick={handleAddTodoList}>
                            Add List
                        </CustomButton>
                    </div>
                    {todos.map((todo) => (
                        <React.Fragment key={todo._id}>
                            <li className='bg-white w-full border border-gray-300 p-3 m-3 sm:w-3/4 md:w-1/2 lg:w-1/2 rounded-lg shadow-xl hover:scale-105 duration-300' key={todo._id}>

                                <h2 className='font-medium text-xl lg:text-2xl p-1'>{todo.name}</h2>
                                <ul className='p-1 '>
                                    {todo.todos.map((el, index) =>
                                        <li className='tasks flex items-center justify-between h-10 my-1 px-1 border border-gray-300 rounded-lg py-3'key={index}>
                                            <span className="flex-grow">{el.task}</span>
                                            <input className='m-2 form-checkbox text-pink-600'
                                                   type='checkbox'
                                                   checked={el.completed}
                                                   onChange={(e) => handleTaskCheckboxChange(todo._id, index, e.target.checked)}
                                            ></input>

                                        </li>)}
                                    <div className='AddNew h-12 flex flex-row justify-content items-center gap-2'>
                                        <input
                                            className="border h-10 p-2  w-3/4 rounded"
                                            type="text"
                                            placeholder="Enter a new task"
                                            value={todoInputs[todo._id] || ''}
                                            onChange={(e) => handleInputTodoChange(todo._id, e.target.value)}
                                        />
                                        <CustomButton onClick={() => handleAddTodo(todo._id)}>
                                            Add Task
                                        </CustomButton>
                                    </div>
                                </ul>

                            </li>
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoListContainer;
