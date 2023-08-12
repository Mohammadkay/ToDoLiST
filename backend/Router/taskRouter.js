const express = require(`express`);
const router = express.Router();
const { createTask, getAllTask, deleteTask, editTask, getTask } = require(`../Controller/taskController`);
router.route("/").post(createTask).get(getAllTask);
router.route("/:id").patch(editTask).delete(deleteTask).get(getTask);
module.exports = router;
