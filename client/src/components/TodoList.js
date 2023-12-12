import React, { useState, useEffect } from "react";
import CustomButton from "./CustomButton";

function TodoList(props) {
  console.log(props.todos); 
  const [newTodo, setNewTodo] = useState(""); //store new todo
  const [editingIndex, setEditingIndex] = useState(null); //track which todo is edited
  const [editedTask, setEditedTask] = useState(""); //store new edited task value

  // Destructuring props to get necessary values and functions
  const {name, todos, addNewTodo, setCompleted, deleteTask, UpdateTask } = props;

    // Handles changes to the new todo input field.

  const handleInputTodoChange = (event) => {
    setNewTodo(event.target.value);
  };
//   const handleEditClick = (index) => {
//     setEditingIndex(index);
//     setEditedTask(todos[index].task);
//   };

//   const saveEdit = (index) => {
//     console.log('Saving edit for index:', index);

//   const updatedTask = { ...todos[index], task: editedTask };

//   // Call the update function with the index and the updated task
//   if (typeof props.updateTask === 'function') {
//     props.updateTask(index, updatedTask);
//   } else {
//     console.error('updateTask is not a function');
//   }
  
//   setEditingIndex(null);
//   setEditedTask('');
// };



  return (
    <li
      className="bg-white w-full border border-gray-300 p-3 m-3 my-5 sm:w-3/4 md:w-1/2 lg:w-1/2 rounded-lg shadow-xl hover:scale-105 duration-300"
    >
      <h2 className="font-medium text-xl lg:text-2xl p-1">
        {name}
      </h2>
      <ul className="p-1 ">
      {todos.map((el, index) => (
  <div key={index} className="flex flex-row justify-content items-center gap-2">
    {editingIndex === index ? (
      <input
        className="border h-10 p-2 w-full rounded"
        type="text"
        value={editedTask}
        onChange={(e) => setEditedTask(e.target.value)}
      />
    ) : (
      <li className="px-3 tasks w-full flex items-center justify-between h-10 my-1 border border-gray-300 rounded-lg py-3">
        <span className="flex-grow">{el.task}</span>
        <input
          className="m-2 form-checkbox text-pink-600"
          type="checkbox"
          checked={el.completed}
          onChange={() => setCompleted(index, !el.completed)}
        />
      </li>
    )}
    <div className="flex flex-row items-center gap-1">
      {/* {editingIndex === index ? (
        <CustomButton onClick={() => saveEdit(editingIndex)}>Save</CustomButton>
      ) : (
        <>
          <CustomButton onClick={() => handleEditClick(index)}>Edit</CustomButton> */}
          <CustomButton onClick={() => deleteTask(index)}>Delete</CustomButton>
        {/* </>
      )} */}
    </div>
  </div>
))}

        
        <div className="AddNew h-12 flex flex-row justify-content items-center gap-2">
          <input
            className="border h-10 p-2 w-3/4 rounded"
            type="text"
            placeholder="Enter a new task"
            value={newTodo}
            onChange={handleInputTodoChange}
            
          />
          <CustomButton onClick={() => {
            addNewTodo(newTodo);setNewTodo('');}}>
            Add
          </CustomButton>
        </div>
      </ul>
    </li>
  )
}

export default TodoList;