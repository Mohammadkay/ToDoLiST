const express = require(`express`);
const router = express.Router();
const { createNewList, getAllList, editList, deleteList, getList } = require(`../Controller/listController`);

router.route(`/`).post(createNewList).get(getAllList);
router.route("/:id").patch(editList).delete(deleteList).get(getList);
module.exports = router;
