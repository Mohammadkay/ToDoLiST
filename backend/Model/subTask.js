const mongoose = require(`mongoose`);
const subTaskSchema = mongoose.Schema({
  subTaskName: {
    type: String,
    required: [true, `The name of sub task is require`]
  },
  isDone: {
    type: Boolean,
    default: false
  }
});
const SubTask = mongoose.model("SubTask", subTaskSchema);
module.exports = SubTask;
