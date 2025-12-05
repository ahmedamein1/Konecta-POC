const express = require("express");
const router = express.Router();

const { readTodos, resetTodos } = require("../service/todos.service");
const { validateCreateTodo } = require("../validation/todo.validation");

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

router.post("/", async (req, res, next) => {
  try {
    const validation = validateCreateTodo(req.body);

    if (!validation.valid) {
      const error = new Error(validation.message);
      error.status = 400;
      return next(error);
    }

    const { title, note } = req.body;
    const newTodo = await createTodo(title, note);

    res.status(201).json({
      message: "Todo created successfully",
      todo: newTodo,
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
