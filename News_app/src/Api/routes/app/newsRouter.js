const express = require("express");
const {
  allnewsList,
  getNewsById,
} = require("../../controllers/app/newsController");

const router = express.Router();

router.get("/get-allnews", allnewsList);

router.get("/get-news/:id", getNewsById);



module.exports = router;
