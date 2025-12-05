import axios from "axios";

const API_URL = process.env.REACT_APP_TODO_API_ENDPOINT;

export const getTodos = async () => {
  return await axios.get(API_URL);
};

export const createTodo = async (todoData) => {
  return await axios.post(API_URL, todoData);
};

export const updateTodoStatus = async (id, status) => {
  return await axios.patch(`${API_URL}/${id}`, { status });
};

export const updateTodo = async (id, data) => {
  return await axios.put(`${API_URL}/${id}`, data);
};

export const deleteTodo = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
