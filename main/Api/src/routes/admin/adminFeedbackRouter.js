const {
  getAllFeedback,
  deleteFeedback,
} = require("../../controllers/admin/adminSettingController");

const router = require("express").Router();

/* ------------------------- add FAQS route ------------------------ */
// router.post("/add-Faqs", addFaqs);

/* ------------------------- get all FAQS route ------------------------ */
router.get("/get-Feedback", getAllFeedback);

/* ------------------------- delete all FAQS route ------------------------ */
router.delete("/delete-Feedback/:id", deleteFeedback);

module.exports = router;
