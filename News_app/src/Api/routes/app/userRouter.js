const express = require("express");
const {
  signupUser,
  loginUser,
  forgotPasswordEmail,
} = require("../../controllers/app/UserContoller");
const router = express.Router();


router.post("/signup", signupUser);

router.post("/signin", loginUser);

router.post("/forgot-password", forgotPasswordEmail);

module.exports = router;