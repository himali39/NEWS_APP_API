const express = require("express");
const { singleFileUpload } = require("../../helper/upload");

const { addPersonalize } = require("../../controllers/admin/personalizeContoller");
const router = express.Router();

router.post(
  "/addpersonalize",
  singleFileUpload("/personalize_images/", "image"),
  addPersonalize
);

module.exports = router;
