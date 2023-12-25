const express = require("express");

const { addPersonalize } = require("../../controllers/app/personalizeContoller");
const router = express.Router();

router.post("/addpersonalize", addPersonalize);



module.exports = router;
