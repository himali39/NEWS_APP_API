const express = require("express");
const { multiDiffFileUpload } = require("../../helper/upload");
const {
  addNews,
  allNewsList,
  deleteNews,
  updateNews,
  updateNewsStatus,
} = require("../../controllers/admin/adminNewsController");
const verifyAdminToken = require("../../helper/verifyAdminToken");
const router = express.Router();

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

router.get("/get-News", verifyAdminToken, allNewsList);

router.delete("/delete-News/:id", verifyAdminToken, deleteNews);

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
router.put("/update-Status/:id", verifyAdminToken, updateNewsStatus);

module.exports = router;
