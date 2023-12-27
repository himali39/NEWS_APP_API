const { addLanguage } = require("../../controllers/admin/languagesController");
const { multiDiffFileUpload } = require("../../helper/upload");

const router = require("express").Router();

// Use router in index
router.post(
  "/addLanguage",
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
  addLanguage
);

module.exports = router;
