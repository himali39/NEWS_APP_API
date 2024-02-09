const express = require("express");
const { multiDiffFileUpload } = require("../../helper/upload");
const {
  addNews,
  allNewsList,
  deleteNews,
  updateNews,
  updateNewsStatus,
  deleteMultipleNews,
} = require("../../controllers/admin/adminNewsController");
const verifyAdminToken = require("../../helper/verifyAdminToken");
const router = express.Router();

/* ----------------------- add News data route  ----------------------- */
router.post(
  "/add-News",
  verifyAdminToken,
  multiDiffFileUpload("/News_image/", [
    {
      name: "newsImage",
      maxCount: 1,
      allowedMimes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
    },
    {
      name: "multipleImage",
      maxCount: 15,
      allowedMimes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
    },
    {
      name: "video",
      maxCount: 1,
      allowedMimes: ["video/mp4"],
    },
  ]),
  addNews
);

/* ----------------------- list of  News route  ----------------------- */
router.get("/get-News", verifyAdminToken, allNewsList);

/* ----------------------- delete  News route  ----------------------- */
router.delete("/delete-News/:id", verifyAdminToken, deleteNews);

/* ----------------------- delete multiple News route  ----------------------- */
router.delete("/multidelete-News", verifyAdminToken, deleteMultipleNews);

/* ----------------------- update  News route  ----------------------- */
router.put(
  "/update-News/:id",
  verifyAdminToken,
  multiDiffFileUpload("/News_image/", [
    {
      name: "newsImage",
      maxCount: 1,
      allowedMimes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
    },
    {
      name: "multipleImage",
      maxCount: 15,
      allowedMimes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
    },
    {
      name: "video",
      maxCount: 1,
      allowedMimes: ["video/mp4"],
    },
  ]),
  updateNews
);

/* ----------------------- news status update route  ----------------------- */
router.put("/update-Status/:id", verifyAdminToken, updateNewsStatus);

module.exports = router;
