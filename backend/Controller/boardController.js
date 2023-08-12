const Board = require(`../Model/BoardModel`);
const List = require("../Model/listModel");

exports.addNewBoard = async (req, res) => {
  try {
    const newBoard = await Board.create(req.body);

    const lists = await List.create([
      {
        title: "TODO",
        color: "#3fc8e1"
      },
      {
        title: "DOING",
        color: "#72d6ab"
      },
      {
        title: "DONE",
        color: "#8975fb"
      }
    ]);
    await Board.findByIdAndUpdate(newBoard._id, {
      $push: {
        lists: { $each: lists.map((list) => list._id) }
      }
    });
    res.status(201).json({
      status: "success",
      data: newBoard
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};
exports.getAllBoard = async (req, res) => {
  try {
    const boards = await Board.find();
    res.status(200).json({
      status: "success",
      data: boards
    });
  } catch (err) {
    res.status(400).json({
      status: "Fall",
      message: err.message
    });
  }
};
exports.getBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: board
    });
  } catch (err) {
    res.status(400).json({
      status: "Fall",
      message: err.message
    });
  }
};
exports.changeBoardName = async (req, res) => {
  try {
    const newName = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(201).json({
      status: "success",
      data: newName
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message
    });
  }
};
exports.DeleteBoard = async (req, res) => {
  try {
    const boardId = req.params.id;

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({
        status: "fail",
        message: "Board not found"
      });
    }

    await List.deleteMany({ _id: { $in: board.lists } });

    await Board.findByIdAndDelete(boardId);

    res.status(200).json({
      status: "success",
      message: "Board deleted successfully"
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};
