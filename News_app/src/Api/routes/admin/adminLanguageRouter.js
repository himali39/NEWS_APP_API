const { addLanguage, getLanguage } = require("../../controllers/admin/adminLanguagesController");
const { multiDiffFileUpload } = require("../../helper/upload");

const router = require("express").Router();

/* --------------------------- add Language route --------------------------- */
router.post(
  "/addLanguage",
  multiDiffFileUpload("/languages", [
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

/* ------------------------- get Language data route ------------------------ */
router.get("/get-Languages", getLanguage);

module.exports = router;
