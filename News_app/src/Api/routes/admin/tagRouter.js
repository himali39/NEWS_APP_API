const express = require("express");
const { addTag } = require("../../controllers/admin/tagController");

const router = express.Router();

router.post("/add-Tag", addTag);


router.post("/add-Tag", addTag);

module.exports = router;
