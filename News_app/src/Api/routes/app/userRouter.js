const express = require("express");
const {
  signupUser,
  loginUser,
  forgotPasswordEmail,
  updateAutoPlay,
  updateLocation,
  updateUserProfile,
} = require("../../controllers/app/UserContoller");
const router = express.Router();


router.post("/signup", signupUser);

router.post("/signin", loginUser);

router.post("/forgot-password", forgotPasswordEmail);

router.put("/update-UserProfile", updateUserProfile);

router.put("/update-AutoPlay/:id", updateAutoPlay);

router.get("/update-Location", updateLocation);



module.exports = router;