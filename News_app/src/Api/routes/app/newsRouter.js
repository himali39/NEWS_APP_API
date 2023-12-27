const express = require("express");
const {
  allnewsList,
  getNewsById,
  searchNews,
  getTrandingTagList
} = require("../../controllers/app/newsController");

const router = express.Router();

router.get("/get-allnews", allnewsList);

router.get("/get-news/:id", getNewsById);

router.get("/get-searchNews", searchNews);

router.get("/trending-hashtags", getTrandingTagList);





module.exports = router;
