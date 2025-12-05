function validateCreateTodo(body) {
  const { title, note } = body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return {
      valid: false,
      message: "Title is required and must not be empty."
    };
  }

  if (note && typeof note !== "string") {
    return {
      valid: false,
      message: "Note must be a string."
    };
  }

  return { valid: true };
}

module.exports = { validateCreateTodo };
