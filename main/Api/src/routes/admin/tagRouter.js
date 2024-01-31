const express = require("express");
const { addTag, getTagData, deleteTag, updateTag, updateTagStatus } = require("../../controllers/admin/adminTagController");

const router = express.Router();

/* ----------------------- add Tag route ----------------------- */
router.post("/add-Tag", addTag);

/* ----------------------- get Tag route ----------------------- */
router.get("/get-Tag", getTagData);

/* ----------------------- delete Tag route  ----------------------- */
router.delete("/delete-Tag/:id", deleteTag);

/* ----------------------- update Tag route  ----------------------- */
router.put("/update-Tag/:id", updateTag);

/* ----------------------- update Tag status  ----------------------- */
router.put("/update-Status/:id", updateTagStatus);

module.exports = router;
