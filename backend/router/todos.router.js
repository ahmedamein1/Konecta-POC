const express = require("express");
const router = express.Router();

const { readTodos, resetTodos } = require("../service/todos.service");


router.get("/", async (req, res, next) => {
  try {
    const fetchTodos = await readTodos();
    const { todos, activeTodosNumber } = fetchTodos;

    res.status(200).json({
      todos,
      activeTodosNumber,
    });
  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
});



router.delete("/reset", async (req, res, next) => {
  try {
    await resetTodos();
    res.status(200).json({
      message: "Todos have been reset.",
      todos: [],
    });
  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
});

module.exports = router;
