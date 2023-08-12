const mongoose = require(`mongoose`);
const boardSchema = mongoose.Schema({
  boardName: {
    type: String,
    required: [true, "please enter name for the board"]
  },
  lists: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "List"
    }
  ]
});
const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
