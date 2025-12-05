require("dotenv").config();
const express = require("express");
const todoRouter = require("./router/todos");

const app = express();

app.use(express.json());
app.use("/todo", todoRouter);



app.use((req, res, next) => {
  const error = new Error(
    "The endpoint you're trying to access does not exist."
  );
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.message);

  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
