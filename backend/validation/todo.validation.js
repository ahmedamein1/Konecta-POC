function validateCreateTodo(userInput) {
  const { title, note } = userInput;

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

function validateStatusUpdate(status) {
  const allowed = ["NEW", "IN-PROGRESS", "DONE"];

  if (!status || typeof status !== "string") {
    return {
      valid: false,
      message: "Status is required."
    };
  }

  if (!allowed.includes(status)) {
    return {
      valid: false,
      message: `Invalid status. Allowed values are: ${allowed.join(", ")}.`
    };
  }

  return { valid: true };
}

module.exports = { validateCreateTodo, validateStatusUpdate };
