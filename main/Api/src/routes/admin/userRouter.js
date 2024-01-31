const express = require("express");
const { allUserList, addUser, deleteUser, updateUser, getStatusWiseUserCount } = require("../../controllers/admin/adminUserController");
const { singleFileUpload } = require("../../helper/upload");

const router = express.Router();

/* ------------------------------ add user data ----------------------------- */
router.post("/add-user", singleFileUpload("/userImg/", "ProfileImg"), addUser);

router.get("/get-user", allUserList);

router.delete("/delete-user/:id", deleteUser);

router.get("/get-activeUser", getStatusWiseUserCount);

router.put("/update-user/:id",singleFileUpload("/userImg/", "ProfileImg"), updateUser);

module.exports = router;