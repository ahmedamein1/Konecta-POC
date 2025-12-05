const fs = require("fs").promises;
const path = require("path");

const DATA_FILE = path.join(__dirname, "../todos-data/todoss.json");

async function readTodos() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
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

module.exports = { readTodos, resetTodos };
