const express = require("express");
const router = express.Router();
const { readTodos } = require("../service/todos.service");

router.get("/", async (req, res, next) => {
  try {
    const todos = await readTodos();
    res.status(200).json({
      todos,
    });
  } catch (err) {
    const error = new Error("An error occurred while fetching todos.");
    error.status = 500;
    next(error); 
  }
});

module.exports = router;
