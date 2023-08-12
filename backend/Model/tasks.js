const mongoose = require(`mongoose`);
const tasksSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "The name of the task is require"]
  },
  description: {
    type: String
  },
  data: {
    type: Date,
    default: Date.now
  },
  subTask: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "SubTask"
    }
  ]
});
const Tasks = mongoose.model("Tasks", tasksSchema);
module.exports = Tasks;
