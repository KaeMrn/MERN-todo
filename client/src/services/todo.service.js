//@ts-check
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

// Function to get todo lists by a specific user.

export const getTodoListsByUser = async (userId) => {
    try {
        return (await axios.get(`${API_BASE_URL}/todo`, {withCredentials: true})).data;
    } catch (error) {
        // Handle error if needed
    }
};

// Function to update a specific todo list.

export const updateTodoList = async (userId, todo) => {
    try {
        return (await axios.put(`${API_BASE_URL}/todo/${todo._id}`, todo, {withCredentials: true})).data;
    } catch (error) {
        // Handle error if needed
    }
}
// Function to add a new todo list.

export const addTodoList = async (userId, todo) => {
    try {
        return (await axios.post(`${API_BASE_URL}/todo`, todo, {withCredentials: true})).data;
    } catch (error) {
        // Handle error if needed
    }
}
// Function to delete a specific todo list.

export const deleteTodoList = async (userId, todoListId) => {
    try {
        return (await axios.delete(`${API_BASE_URL}/todo/${todoListId}`, { withCredentials: true })).data;
    } catch (error) {
        console.error('Error in deleteTodoList:', error);
    }
}

// Function to update a specific task in a todo list(not working for now)
export const updateTaskInList = async (todoListId, taskId, updatedTask) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/todo/${todoListId}/tasks/${taskId}`, updatedTask, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error updating task in list:', error);
        // Handle error if needed
    }
};

