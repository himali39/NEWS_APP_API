const {
  getAllFeedback,
  deleteFeedback,
} = require("../../controllers/admin/adminSettingController");
const verifyAdminToken = require("../../helper/verifyAdminToken");

const router = require("express").Router();

/* ------------------------- add FAQS route ------------------------ */
// router.post("/add-Faqs", addFaqs);

/* ------------------------- get all FAQS route ------------------------ */
router.get("/get-Feedback",verifyAdminToken, getAllFeedback);

/* ------------------------- delete all FAQS route ------------------------ */
router.delete("/delete-Feedback/:id",verifyAdminToken, deleteFeedback);

module.exports = router;
