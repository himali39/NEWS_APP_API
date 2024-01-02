const express = require("express");
const {
  getLanguage,
 
} = require("../../controllers/app/appLanguageController");

const router = express.Router();

/* -------------------------- list of Language data ------------------------- */
router.get("/get-Language", getLanguage);


module.exports = router;
