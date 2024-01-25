const express = require("express");
const { allUserList, addUser, deleteUser, updateUser } = require("../../controllers/admin/adminUserController");
const { singleFileUpload } = require("../../helper/upload");

const router = express.Router();

router.post("/add-user", singleFileUpload("/userImg/", "ProfileImg"), addUser);

router.get("/get-user", allUserList);

router.delete("/delete-user/:id", deleteUser);

router.put("/update-user/:id",singleFileUpload("/userImg/", "ProfileImg"), updateUser);

module.exports = router;