const express = require("express");
const { allUserList, addUser, deleteUser, updateUser, getStatusWiseUserCount, deleteMultipleUser } = require("../../controllers/admin/adminUserController");
const { singleFileUpload } = require("../../helper/upload");
const verifyAdminToken = require("../../helper/verifyAdminToken");

const router = express.Router();

/* ------------------------------ add user data ----------------------------- */
router.post(
  "/add-user",
  verifyAdminToken,
  singleFileUpload("/userImg/", "ProfileImg"),
  addUser
);

router.get("/get-user", verifyAdminToken, allUserList);

router.delete("/delete-user/:id", verifyAdminToken, deleteUser);

router.delete("/multidelete-user", deleteMultipleUser);

router.get("/get-activeUser", verifyAdminToken, getStatusWiseUserCount);

router.put(
  "/update-user/:id",
  verifyAdminToken,
  singleFileUpload("/userImg/", "ProfileImg"),
  updateUser
);

module.exports = router;