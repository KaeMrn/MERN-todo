import React, { useState, useEffect } from "react";
import {
  addTodolist,
  getTodosByUser,
  updateTodolist,
} from "../services/todo.service";
import CustomButton from "./CustomButton";

const TodoListContainer = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [newTodoList, setNewTodoList] = useState("");
  const [todoInputs, setTodoInputs] = useState({});

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getTodosByUser(null || []);
        setTodos(response);
      } catch (error) {
        console.error("Error fetching to-dos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleInputTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleInputTodoListChange = (event) => {
    setNewTodoList(event.target.value);
  };

  const handleAddTodo = async (id) => {
    const todoList = todos.find((todo) => todo._id === id);
    const newTodoObject = {
      ...todoList,
      todos: [
        ...todoList.todos,
        {
          task: newTodo,
          completed: false,
        },
      ],
    };

    await updateTodolist(null, {
      ...newTodoObject,
    });

    setTodos([
      ...todos.map((todo) => (todo._id === id ? newTodoObject : todo)),
    ]);
    setNewTodo("");
  };

  const handleAddTodoList = async () => {
    const todoList = {
      _id: Date.now().toString(), // Mock ID
      name: newTodoList,
      userId: 123,
      todos: [],
    };

    const newTodoListResponse = await addTodolist(null, {
      ...todoList,
    });

    todoList._id = newTodoListResponse._id;
    setTodos([todoList, ...todos]);
    setNewTodoList("");
  };
  const handleTaskCheckboxChange = (todoId, taskIndex, isChecked) => {
    setTodos(
      todos.map((todo) => {
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
      })
    );
  };

  return (
    <div>
      <div className="w-full py-[4rem] bg-gray-200">
        <ul className="py-4 flex flex-col justify-center items-center">
          {/*centering the "add new lists input bar" and making the enitre div the same width as the task cards by using justify-between  */}
          <div
            className="newList w-full border border-gray-300 m-3 px-2 sm:w-3/4 md:w-1/2 lg:w-1/2 rounded-lg shadow-xl h-12
        flex flex-row justify-between items-center gap-2"
          >
            <input
              className="border h-10 p-2 w-3/4  rounded"
              type="text"
              placeholder="Enter a new todo list"
              value={newTodoList}
              onChange={handleInputTodoListChange}
            />
            <CustomButton onClick={handleAddTodoList}>Add List</CustomButton>
          </div>
          {todos.map((todo) => (
            <React.Fragment key={todo._id}>
              <li
                className="bg-white w-full border border-gray-300 p-3 m-3 sm:w-3/4 md:w-1/2 lg:w-1/2 rounded-lg shadow-xl hover:scale-105 duration-300"
                key={todo._id}
              >
                <h2 className="font-medium text-xl lg:text-2xl p-1">
                  {todo.name}
                </h2>
                <ul className="p-1 ">
                  {todo.todos.map((el, index) => (
                    <li
                      className="tasks flex items-center justify-between h-10 my-1 px-1 border border-gray-300 rounded-lg py-3"
                      key={index}
                    >
                      <span className="flex-grow">{el.task}</span>
                      <input
                        className="m-2 form-checkbox text-pink-600"
                        type="checkbox"
                        checked={el.completed}
                        onChange={(e) =>
                          handleTaskCheckboxChange(
                            todo._id,
                            index,
                            e.target.checked
                          )
                        }
                      ></input>
                    </li>
                  ))}
                  <div className="AddNew h-12 flex flex-row justify-content items-center gap-2">
                    <input
                      className="border h-10 p-2  w-3/4 rounded"
                      type="text"
                      placeholder="Enter a new task"
                      value={newTodo}
                      onChange={handleInputTodoChange}
                      
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
