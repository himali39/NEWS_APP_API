const express = require("express");
const {
  getLanguage,
  updateNewsLanguage,
  updateAppLanguage,
} = require("../../controllers/app/appLanguageController");

const router = express.Router();

/* -------------------------- list of Language data ------------------------- */
router.get("/get-Language", getLanguage);

router.put("update-Language", updateNewsLanguage);

router.put("/update-Applanguage", updateAppLanguage);

module.exports = router;
