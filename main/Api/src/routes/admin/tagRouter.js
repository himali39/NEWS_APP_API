const express = require("express");
const { addTag, getTagData, deleteTag, updateTag } = require("../../controllers/admin/adminTagController");

const router = express.Router();

router.post("/add-Tag", addTag);

router.get("/get-Tag", getTagData);

router.delete("/delete-Tag/:id", deleteTag);

router.put("/update-Tag/:id", updateTag);

module.exports = router;
