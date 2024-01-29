const express = require("express");
const {
  addNotification,
  deleteNotification,
  updateNotification,
  getAllNotification,
} = require("../../controllers/admin/adminNotificationController");
const { singleFileUpload } = require("../../helper/upload");

const router = express.Router();

/* ----------------------- add Notification route ----------------------- */
router.post(
  "/add-Notification",
  singleFileUpload("/notifImages", "notifiImage"),
  addNotification
);

router.get("/get-Notification", getAllNotification);

router.delete("/delete-Notification/:id", deleteNotification);

router.put("/update-Notification/:id", updateNotification);

module.exports = router;
