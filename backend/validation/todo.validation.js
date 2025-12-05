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

function validateFullUpdate(input) {
  const { title, note, status } = input;

  
  if (
    title === undefined ||
    note === undefined ||
    status === undefined
  ) {
    return {
      valid: false,
      message: "Title, note, and status are all required."
    };
  }

  
  if (typeof title !== "string" || title.trim() === "") {
    return {
      valid: false,
      message: "Title must be a non-empty string."
    };
  }

  
  if (typeof note !== "string") {
    return {
      valid: false,
      message: "Note must be a string."
    };
  }

 
  const allowedStatuses = ["NEW", "IN-PROGRESS", "DONE"];
  if (!allowedStatuses.includes(status)) {
    return {
      valid: false,
      message: `Invalid status. Allowed values: ${allowedStatuses.join(", ")}`
    };
  }

  return { valid: true };
}

module.exports = { validateCreateTodo, validateStatusUpdate, validateFullUpdate };
