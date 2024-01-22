const express = require("express");
const {
  signupUser,
  loginUser,
  forgotPasswordEmail,
  updateAutoPlay,
  updateLocation,
  updateUserProfile,
  updateNewsLanguage,
  updateAppLanguage,
  RefreshToken,
  resetPassword,
} = require("../../controllers/app/userContoller");
const router = express.Router();
const { singleFileUpload } = require("../../helper/upload");

router.post("/signup", signupUser);

router.post("/signin", loginUser);

router.post("/forgot-password", forgotPasswordEmail);

router.post("/reset-password", resetPassword);

router.post("/refreshToken", RefreshToken);

router.put(
  "/update-UserProfile",
  singleFileUpload("/userImg", "ProfileImg"),
  updateUserProfile
);

router.put("/update-AutoPlay/:id", updateAutoPlay);

router.get("/update-Location", updateLocation);

router.put("/update-NewsLanguage", updateNewsLanguage);

router.put("/update-AppLanguage", updateAppLanguage);



module.exports = router;