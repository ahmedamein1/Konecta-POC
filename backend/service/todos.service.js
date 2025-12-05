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

async function createTodo(title, note) {
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


module.exports = { readTodos, resetTodos };
