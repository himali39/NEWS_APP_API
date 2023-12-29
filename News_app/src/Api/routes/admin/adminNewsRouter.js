const express = require("express");
const { singleFileUpload, multiFileUpload } = require("../../helper/upload");
const {
  addNews,
  allNewsList,
} = require("../../controllers/admin/adminNewsController");
const router = express.Router();

router.post(
  "/add-news",
  // singleFileUpload("/News_image/", "news_image"),
  multiFileUpload("/News_image/", {
    name: "multipleImage",
    allowedMimes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
    fileSize: 1024 * 1024 * 5,
  }),
  addNews
);

router.get("/get-news", allNewsList);

module.exports = router;

//  multiDiffFileUpload("/languages", [
//     {
//       name: "json_file",
//       maxCount: 1,
//       allowedMimes: ["application/json"],
//     },
//     {
//       name: "flag_image",
//       maxCount: 1,
//       allowedMimes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
//     },
//   ]),
