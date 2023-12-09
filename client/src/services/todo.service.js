//@ts-check
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const getTodosByUser = async (userId) => {
    try {
        return (await axios.get(`${API_BASE_URL}/todo`)).data;
    } catch (error) {
        // Handle error if needed
    }
};

export const updateTodolist = async (userId, todo) => {
    try {
        return (await axios.put(`${API_BASE_URL}/todo/${todo._id}`, todo)).data;
    } catch (error) {
        // Handle error if needed
    }
}


export const addTodolist = async (userId, todo) => {
    try {
        return (await axios.post(`${API_BASE_URL}/todo`, todo)).data;
    } catch (error) {
        // Handle error if needed
    }
}