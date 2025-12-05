const express = require("express");
const router = express.Router();

const {
  readTodos,
  resetTodos,
  createTodo,
  deleteTodo,
  updateTodoStatus,
} = require("../service/todos.service");
const {
  validateCreateTodo,
  validateStatusUpdate,
} = require("../validation/todo.validation");

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
    const { title, note } = req.body;

    const validation = validateCreateTodo({ title, note });

    if (!validation.valid) {
      const error = new Error(validation.message);
      error.status = 400;
      return next(error);
    }

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

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTodo = await deleteTodo(id);

    res.status(200).json({
      message: "Todo deleted successfully",
      deletedTodo,
    });
  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
});

router.patch("/:id/status", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validation = validateStatusUpdate(status);
    if (!validation.valid) {
      const error = new Error(validation.message);
      error.status = 400;
      return next(error);
    }

    const updatedTodo = await updateTodoStatus(id, status);

    res.status(200).json({
      message: "Todo status updated successfully",
      todo: updatedTodo
    });

  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
});

module.exports = router;
