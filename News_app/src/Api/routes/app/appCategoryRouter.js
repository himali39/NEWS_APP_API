const express = require("express");
const { getCategory } = require("../../controllers/app/appCategoryController");

const router = express.Router();


router.get("/get-category", getCategory);

module.exports = router;
