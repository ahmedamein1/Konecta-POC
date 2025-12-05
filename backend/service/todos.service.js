const fs = require("fs").promises;
const path = require("path");

const DATA_FILE = path.join(__dirname, "../todos-data/todos.json");

async function readTodos() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

module.exports = { readTodos };
