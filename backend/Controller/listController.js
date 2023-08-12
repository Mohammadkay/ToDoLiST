const List = require("../Model/listModel");
const Board = require("../Model/BoardModel");
const Task = require("../Model/tasks");

exports.createNewList = async (req, res) => {
  try {
    const newlist = await List.create(req.body);

    res.status(201).json({
      status: "success",
      data: newlist
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message
    });
  }
};

exports.getAllList = async (req, res) => {
  try {
    const lists = await List.find();
    res.status(200).json({
      status: "success",
      data: lists
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message
    });
  }
};
exports.getList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: list
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message
    });
  }
};
exports.editList = async (req, res) => {
  try {
    const newList = await List.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(201).json({
      status: "success",
      data: newList
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};
exports.deleteList = async (req, res) => {
  try {
    const listId = req.params.id;

    // Find the list using the List model
    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).json({
        status: "fail",
        message: "List not found"
      });
    }

    // Update boards to remove the list reference
    const updatedBoards = await Board.updateMany({ lists: listId }, { $pull: { lists: listId } });

    // Delete tasks associated with the list
    await Task.deleteMany({ _id: { $in: list.tasks } });

    // Delete the list itself
    await List.findByIdAndDelete(listId);

    res.status(200).json({
      status: "success",
      data: "The task  deleted "
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};
