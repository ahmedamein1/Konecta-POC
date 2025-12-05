const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");

const DATA_FILE = path.join(__dirname, "../todos-data/todos.json");

async function readTodos() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    const todos = JSON.parse(data);
    const activeTodosNumber = todos.filter(
      (todo) => todo.status === "NEW" || todo.status === "IN-PROGRESS"
    ).length;

    return {
      todos,
      activeTodosNumber,
    };
  } catch (e) {
    throw new Error("An error occurred while fetching todos.");
  }
}

async function resetTodos() {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
  } catch (e) {
    throw new Error("An error occurred while resetting todos.");
  }
}

async function createTodo(title, note = '') {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    const todos = JSON.parse(data);

    const newTodo = {
      id: crypto.randomUUID(), 
      title,
      note,
      status: "NEW"    
    };

   
    todos.push(newTodo);

    await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2));

    return newTodo;

  } catch (e) {
    throw new Error("An error occurred while creating a todo.");
  }
}


async function deleteTodo(id) {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    const todos = JSON.parse(data);

    const existingTodo = todos.find((t) => t.id === id);
    if (!existingTodo) {
      const error = new Error("Todo not found.");
      error.status = 404;
      throw error;
    }
    const updatedTodos = todos.filter((t) => t.id !== id);

    await fs.writeFile(DATA_FILE, JSON.stringify(updatedTodos, null, 2));

    return existingTodo;

  } catch (e) {
    if (!e.status) {
      throw new Error("An error occurred while deleting the todo.");
    }
    throw e; 
  }
}


async function updateTodoStatus(id, status) {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    const todos = JSON.parse(data);

    const todoIndex = todos.findIndex((t) => t.id === id);

    if (todoIndex === -1) {
      const error = new Error("Todo not found.");
      error.status = 404;
      throw error;
    }

    todos[todoIndex].status = status;

    await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2));

    return todos[todoIndex];

  } catch (e) {
    if (!e.status) {
      throw new Error("An error occurred while updating the todo status.");
    }
    throw e;
  }
}


async function updateTodo(id, { title, note, status }) {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    const todos = JSON.parse(data);

    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
      const error = new Error("Todo not found.");
      error.status = 404;
      throw error;
    }

    todos[index].title = title;
    todos[index].note = note;
    todos[index].status = status;

 
    await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2));

    return todos[index];

  } catch (e) {
    if (!e.status) {
      throw new Error("An error occurred while updating the todo.");
    }
    throw e;
  }
}





module.exports = { readTodos, resetTodos, createTodo, deleteTodo, updateTodoStatus, updateTodo };
