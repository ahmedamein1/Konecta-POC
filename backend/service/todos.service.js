const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../todos-data/todos.json");

function readTodos() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

module.exports = { readTodos };
