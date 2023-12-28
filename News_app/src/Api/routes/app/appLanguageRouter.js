const express = require("express");
const { getLanguage } = require("../../controllers/admin/adminLanguagesController");

const router = express.Router();

 /* -------------------------- list of Language data ------------------------- */
router.get("/get-Language", getLanguage);

module.exports = router;
