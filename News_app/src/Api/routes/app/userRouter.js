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
} = require("../../controllers/app/UserContoller");
const router = express.Router();


router.post("/signup", signupUser);

router.post("/signin", loginUser);

router.post("/forgot-password", forgotPasswordEmail);

router.post("/refreshToken", RefreshToken);

router.put("/update-UserProfile", updateUserProfile);

router.put("/update-AutoPlay/:id", updateAutoPlay);

router.get("/update-Location", updateLocation);

router.put("/update-NewsLanguage", updateNewsLanguage);

router.put("/update-AppLanguage", updateAppLanguage);



module.exports = router;