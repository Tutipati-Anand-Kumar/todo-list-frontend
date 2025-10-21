// service.js
import axiosInstance from "../helper/axizosInstance/AxiosInstance";

const service = {
    registerUser: async (payload) => {
        try {
            const response = await axiosInstance.post("/users", payload);
            return response.data;
        }
        catch (error) {
            console.error("Error during registration:", error);
            throw error;
        }
    },

    loginUser: async (payload) => {
        try {
            const response = await axiosInstance.post("/users/login", payload);
            return response.data;
        }
        catch (error) {
            console.error("Error during login:", error);
            return { isCredintials: false };
        }
    },

    checkUserExit: async (email) => {
        try {
            const response = await axiosInstance.get(`/users/check?email=${email}`);
            return response.data.exists;
        }
        catch (error) {
            console.error("Error checking user:", error);
            return false;
        }
    },

    addTodo: async (payload) => {
        try {
            const response = await axiosInstance.post('/todo', payload);
            return response.data;
        }
        catch (error) {
            console.error("Error adding todo:", error);
            throw error;
        }
    },

    getTodo: async (email) => {
        try {
            const response = await axiosInstance.get(`/todo?createdBy=${email}`);
            return response.data;
        }
        catch (error) {
            console.error("Error fetching todos:", error);
            throw error;
        }
    },

    updateTodo: async (todoId, payload) => {
        try {
            const response = await axiosInstance.put(`/todo/${todoId}`, payload);
            return response.data;
        }
        catch (error) {
            console.error("Error updating todo:", error);
            throw error;
        }
    },

    deleteTodo: async (todoId) => {
        try {
            const response = await axiosInstance.delete(`/todo/${todoId}`);
            return response.data;
        }
        catch (error) {
            console.error("Error deleting todo:", error);
            throw error;
        }
    }
};

export default service;