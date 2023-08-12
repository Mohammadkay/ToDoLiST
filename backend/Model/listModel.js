const mongoose = require(`mongoose`);
const listSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter list title"]
  },
  color: {
    type: String,
    default: "#FF0000"
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: `Task`
    }
  ]
});
const List = mongoose.model("List", listSchema);
module.exports = List;
