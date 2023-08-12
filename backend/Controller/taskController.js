const Task = require("../Model/tasks");
const SubTask = require("../Model/subTask");
const List = require("../Model/listModel");

exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);

    res.status(201).json({
      status: "success",
      data: newTask
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message
    });
  }
};
exports.getAllTask = async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.status(200).json({
      status: "Success",
      data: allTasks
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message
    });
  }
};
exports.getTask = async (req, res) => {
  try {
    const oneTask = await Task.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: oneTask
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message
    });
  }
};
exports.editTask = async (req, res) => {
  try {
    const newTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(201).json({
      status: "success",
      data: newTask
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id; // Change to taskId for consistency

    const task = await Task.findById(taskId);

    // Update lists to remove the task reference
    const updatedLists = await List.updateMany({ tasks: taskId }, { $pull: { tasks: taskId } });

    // Delete associated subtasks
    await SubTask.deleteMany({ _id: { $in: task.subTask } });

    // Delete the task itself
    await Task.findByIdAndDelete(taskId);

    res.status(200).json({
      status: "success",
      data: "Tha task deleted"
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};
