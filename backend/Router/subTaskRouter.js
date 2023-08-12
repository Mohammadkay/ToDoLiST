const express = require("express");
const router = express.Router();
const {
  deleteSubTask,
  editSubTask,
  addSubTask,
  getSubTasks,
  getOneSubTask
} = require("../Controller/subTaskController");
router.route("/").get(getSubTasks).post(addSubTask);
router.route("/:id").patch(editSubTask).delete(deleteSubTask).get(getOneSubTask);
module.exports = router;
