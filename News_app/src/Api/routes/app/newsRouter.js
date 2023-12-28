const express = require("express");
const {
  allnewsList,
  getNewsById,
  searchNews,
  getTrandingTagList,
  forYouNewsList
} = require("../../controllers/app/appNewsController");

const router = express.Router();

router.get("/get-allnews", allnewsList);

router.get("/get-news/:id", getNewsById);

router.get("/get-searchNews", searchNews);

router.get("/get-foryouNews", forYouNewsList);

router.get("/trending-hashtags", getTrandingTagList);





module.exports = router;
