const express = require("express");
const {
  multiDiffFileUpload,
    singleFileUpload,
} = require("../../helper/upload");

const { demo } = require("../../controllers/admin/Demo");
const router = express.Router();

router.post(
  "/demo",
  // singleFileUpload("/personalize_images/", "image"),
    multiDiffFileUpload("/lang", [
      {
        name: "json_file",
        maxCount: 1,
        allowedMimes: ["application/json"],
      },
      {
        name: "flag_image",
        maxCount: 1,
        allowedMimes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
      },
    ]),
  demo
);

module.exports = router;
