import React, { useState, useEffect } from "react";
import {
  addTodoList,
  getTodoListsByUser,
  updateTodoList,
  deleteTodoList,
  updateTaskInList
} from "../services/todo.service";
import CustomButton from "./CustomButton";
import Header from "./Header";
import TodoList from "./TodoList";

const TodoListContainer = (props) => {
  const userId = props.userId;
  const [todoLists, setTodoLists] = useState([]); //store new todos
  const [newTodoList, setNewTodoList] = useState(""); //new name for todos list
  console.log("User ID from cookie:", userId);

  console.log(1, {userId})

    // Fetching todo lists when the userId changes

  useEffect(() => {
    console.log(2, {userId})
    const fetchTodoLists = async () => {
    if (userId) {
      try {
        const response = await getTodoListsByUser(userId);
        setTodoLists(response);
      } catch (error) {
        console.error("Error fetching to-dos:", error);
      }
    }
    };
  
    fetchTodoLists();
  }, [userId]);
  
  

  // Function to handle adding a new task to a todo list.

  const handleAddTodo = async (id, newTodoName) => {
    const todoList = todoLists.find((todo) => todo._id === id);
    const newTodoObject = {
      ...todoList,
      todos: [
        ...todoList.todos,
        {
          task: newTodoName,
          completed: false,
        },
      ],
    };

    await updateTodoList(null, {
      ...newTodoObject,
    });

    setTodoLists([
      ...todoLists.map((todo) => (todo._id === id ? newTodoObject : todo)),
    ]);
  };

  // Function to handle adding a new todo list.

  const handleAddTodoList = async () => {
    const todoList = {
      name: newTodoList,
      userId: parseInt(userId),
      todos: [],
    };

    const newTodoListResponse = await addTodoList(null, {
      ...todoList,
    });

    todoList._id = newTodoListResponse._id;
    setTodoLists([todoList, ...todoLists]);
    setNewTodoList("");
  };
  // Function to handle deleting a task from a todo list.

  const handleDeleteTask = async (todoListId, taskIndex) => {
    const todoList = todoLists.find((todo) => todo._id === todoListId);

    const updatedTasks = {
      ...todoList,
      todos: todoList.todos.filter((task, index) => {
        return index !== taskIndex
      })
    }

    await updateTodoList(null, {
      ...updatedTasks,
    });

    setTodoLists(
      todoLists.map((todo) => {
        if (todo._id === todoListId) {
          return { ...todo, todos: updatedTasks.todos };
        }
        return todo;
      })
    );
  };
  // Function to handle deleting a todo list.

  const handleDeleteTodoList = async (todoListId) => {
    await deleteTodoList(null, todoListId);

    setTodoLists(
      todoLists.filter((todo) => {
        return todoListId !== todo._id;
      })
    );
  };
  // Function to handle changes in the input field for adding a new todo list

  const handleInputTodoListChange = (event) => {
    setNewTodoList(event.target.value);
  };
  // Function to handle changes in the task checkbox (completed status).

  const handleTaskCheckboxChange = async (todoListId, taskIndex, isChecked) => {

    const todoList = todoLists.find((todo) => todo._id === todoListId);

    const updatedTasks = {
      ...todoList,
      todos: todoList.todos.map((task, index) => {
        if (index === taskIndex) {
          return { ...task, completed: isChecked };
        }
        return task;
      })
    }


    await updateTodoList(null, {
      ...updatedTasks,
    });

    setTodoLists(
      todoLists.map((todo) => {
        if (todo._id === todoListId) {
          return { ...todo, todos: updatedTasks.todos };
        }
        return todo;
      })
    );
  };
    // Function to handle updating a task in a todo list.

  const handleUpdateTask = async (todoListId, taskIndex, updatedTask) => {
    try {
      // First, update the task in the backend
      const response = await updateTaskInList(todoListId, updatedTask); // Replace with your actual API call
  
      // Then, update the local state with the response from the backend
      const updatedTodoLists = todoLists.map(todoList => {
        if (todoList._id === todoListId) {
          const updatedTodos = todoList.todos.map((todo, index) =>
            index === taskIndex ? { ...response.data } : todo
          );
          return { ...todoList, todos: updatedTodos };
        }
        return todoList;
      });
  
      setTodoLists(updatedTodoLists);
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle error appropriately
    }
  };
  
  
  
    
  
  
  


  return (
    <div>
      <div className="w-full min-h-screen bg-gray-200">
        <ul className="py-4 px-3 flex flex-col justify-center items-center">
          {/*centering the "add new lists input bar" and making the enitre div the same width as the task cards by using justify-between  */}
          <div
            className="newList w-full border border-gray-300 m-3 px-2 sm:w-3/4 md:w-1/2 lg:w-1/2 rounded-lg shadow-xl h-12
        flex flex-row justify-between items-center gap-2"
          >
            <input
              className="border h-10 p-2 w-3/4 rounded"
              type="text"
              placeholder="Enter a new todo list"
              value={newTodoList}
              onChange={handleInputTodoListChange}
            />
            <CustomButton onClick={handleAddTodoList}>Add</CustomButton>
          </div>
          {todoLists.map((todoList) => (
            <React.Fragment key={todoList._id}>
              <TodoList
                name={todoList.name}
                todos={todoList.todos}
                addNewTodo={(newTodoName) => handleAddTodo(todoList._id, newTodoName)}
                setCompleted={(index, completed) => handleTaskCheckboxChange(todoList._id, index, completed)}
                deleteTask={(index) => handleDeleteTask(todoList._id, index)}
                updateTask={(taskIndex, updatedTask) => handleUpdateTask(todoList._id, taskIndex, updatedTask)}
              

              ></TodoList>
              <CustomButton onClick={() => {handleDeleteTodoList(todoList._id)}}>
                Delete
              </CustomButton>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
  console.log(todoLists); // Check the structure of todoLists

};


export default TodoListContainer;
