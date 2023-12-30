const express = require("express");
const {
  allnewsList,
  getNewsById,
  searchNews,
 
  forYouNewsList,
  getVideoNewList
} = require("../../controllers/app/appNewsController");

const router = express.Router();

router.get("/get-allnews", allnewsList);

router.get("/get-news/:id", getNewsById);

router.get("/get-searchNews", searchNews);

router.post("/allForYouNews", forYouNewsList);

router.get("/video-news",getVideoNewList);


module.exports = router;
