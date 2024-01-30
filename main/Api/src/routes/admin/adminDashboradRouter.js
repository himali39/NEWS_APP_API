const {
  getDashboradCount, getCategoryWiseNewsCount, getLanguageWiseNewsCount,
} = require("../../controllers/admin/adminDashbordController");
const router = require("express").Router();

/* ------------------------- get all FAQS route ------------------------ */
router.get("/count-Dashborad", getDashboradCount);

router.get("/categoryWiseNews", getCategoryWiseNewsCount);

router.get("/languageWiseNews", getLanguageWiseNewsCount);

module.exports = router;
