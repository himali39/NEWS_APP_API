const express = require("express");
const {
  addNotification,
  deleteNotification,
  updateNotification,
  getAllNotification,
} = require("../../controllers/admin/adminNotificationController");
const { singleFileUpload } = require("../../helper/upload");
const verifyAdminToken = require("../../helper/verifyAdminToken");

const router = express.Router();

/* ----------------------- add Notification route ----------------------- */
router.post(
  "/add-Notification",
  verifyAdminToken,
  singleFileUpload("/notifImages", "notifiImage"),
  addNotification
);

router.get("/get-Notification", verifyAdminToken, getAllNotification);

router.delete("/delete-Notification/:id", verifyAdminToken, deleteNotification);

router.put("/update-Notification/:id", verifyAdminToken, updateNotification);

module.exports = router;
