const {
  getDashboradCount, getCategoryWiseNewsCount, getLanguageWiseNewsCount,
} = require("../../controllers/admin/adminDashbordController");
const verifyAdminToken = require("../../helper/verifyAdminToken");
const router = require("express").Router();

/* ------------------------- get all FAQS route ------------------------ */
router.get("/count-Dashborad",verifyAdminToken, getDashboradCount);

router.get("/categoryWiseNews",verifyAdminToken, getCategoryWiseNewsCount);

router.get("/languageWiseNews",verifyAdminToken, getLanguageWiseNewsCount);

module.exports = router;
