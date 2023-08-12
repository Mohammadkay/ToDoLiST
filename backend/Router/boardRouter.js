const express = require(`express`);
const router = express.Router();
const { addNewBoard, getAllBoard, changeBoardName, DeleteBoard, getBoard } = require(`../Controller/boardController`);
router.route("/").get(getAllBoard).post(addNewBoard);
router.route("/:id").patch(changeBoardName).delete(DeleteBoard).get(getBoard);
module.exports = router;
