const express = require("express");
const { singleFileUpload } = require("../../helper/upload");
const { addNews } = require("../../controllers/admin/newsController");
const router = express.Router();

router.post(
  "/add-news",
  singleFileUpload("/News_image/", "news_image"),
  addNews
);

module.exports = router;
