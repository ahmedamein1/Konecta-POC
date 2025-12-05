require('dotenv').config();
const express = require('express');
const todoRouter = require('./router/todos');

const app = express();


app.use(express.json());
app.use('/todo', todoRouter);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
