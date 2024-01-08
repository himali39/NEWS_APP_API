const express = require("express");
const { adminRegister, adminLogin, forgotPasswordEmail, resetPassword } = require("../../controllers/admin/adminController");
const { singleFileUpload } = require("../../helper/upload");
const router = express.Router();


router.post(
  "/register",
  singleFileUpload("/adminImages", "profileImage"),
  adminRegister
);

router.post("/login", adminLogin);

router.post("/forgot-password", forgotPasswordEmail);

router.post("/reset-password", resetPassword);

module.exports = router;
 