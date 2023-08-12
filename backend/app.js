const express = require(`express`);
const app = express();
const boardRouter = require(`./Router/boardRouter`);
const listRouter = require(`./Router/listRouter`);
const taskRouter = require(`./Router/taskRouter`);
const subTaskRouter = require(`./Router/subTaskRouter`);
app.use(express.json());

app.use(`/Api/nixpand/Board/`, boardRouter);
app.use(`/Api/nixpand/lists/`, listRouter);
app.use(`/Api/nixpand/tasks/`, taskRouter);
app.use("/Api/nixpand/subTasks", subTaskRouter);
module.exports = app;
