const express = require("express");
const { getpersonalize } = require("../../controllers/app/personalizeController");

const router = express.Router();


router.get("/get-personalize", getpersonalize);

module.exports = router;
