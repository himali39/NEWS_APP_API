const {
  getDashboradCount,
} = require("../../controllers/admin/adminDashbordController");
const router = require("express").Router();

/* ------------------------- get all FAQS route ------------------------ */
router.get("/count-Dashborad", getDashboradCount);

module.exports = router;
