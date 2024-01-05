const express = require("express");
const { adminRegister, adminLogin } = require("../../controllers/admin/adminController");
const { singleFileUpload } = require("../../helper/upload");
const router = express.Router();


router.post(
  "/register",
  singleFileUpload("/adminImages", "profileImage"),
  adminRegister
);

router.post("/login", adminLogin);

module.exports = router;
 