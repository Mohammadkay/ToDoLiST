const SubTask = require("../Model/subTask");
const Task = require("../Model/tasks");
exports.getSubTasks = async (req, res) => {
  try {
    const subTasks = await SubTask.find();
    res.status(200).json({
      status: "success",
      data: subTasks
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message
    });
  }
};
exports.getOneSubTask = async (req, res) => {
  try {
    const oneSubTasks = await SubTask.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: oneSubTasks
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message
    });
  }
};
exports.addSubTask = async (req, res) => {
  try {
    const newSub = await SubTask.create(req.body);
    res.status(201).json({
      status: "success",
      data: newSub
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message
    });
  }
};
exports.editSubTask = async (req, res) => {
  try {
    const updateSub = await SubTask.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(201).json({
      status: "success",
      data: updateSub
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message
    });
  }
};
exports.deleteSubTask = async (req, res) => {
  try {
    const subId = req.params.id;
    const sub = await SubTask.findById(subId);
    const UpdateTask = await Task.updateMany({ subTask: subId }, { $pull: { subTask: subId } });
    await SubTask.findByIdAndDelete(subId);
    res.status(200).json({
      status: "success",
      message: "the Subtask is deleted"
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message
    });
  }
};
