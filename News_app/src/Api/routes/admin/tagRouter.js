const express = require("express");
const { addTag, getTagData } = require("../../controllers/admin/tagController");

const router = express.Router();

router.post("/add-Tag", addTag);


router.get("/get-Tag", getTagData);

module.exports = router;
