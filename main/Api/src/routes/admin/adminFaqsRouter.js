const { addFaqs, getAllFaqs, updateFaqs, deleteFaqs } = require("../../controllers/admin/adminSettingController");

const router = require("express").Router();

/* ------------------------- add FAQS route ------------------------ */
router.post("/add-Faqs", addFaqs);

/* ------------------------- get all FAQS route ------------------------ */
router.get("/get-Faqs", getAllFaqs);

/* ------------------------- delete all FAQS route ------------------------ */
router.delete("/delete-Faqs/:id", deleteFaqs);

/* ------------------------- add FAQS route ------------------------ */
router.put("/update-Faqs/:id", updateFaqs);


module.exports = router;