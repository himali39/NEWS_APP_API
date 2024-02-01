const { addFaqs, getAllFaqs, updateFaqs, deleteFaqs } = require("../../controllers/admin/adminSettingController");
const verifyAdminToken = require("../../helper/verifyAdminToken");

const router = require("express").Router();

/* ------------------------- add FAQS route ------------------------ */
router.post("/add-Faqs",verifyAdminToken, addFaqs);

/* ------------------------- get all FAQS route ------------------------ */
router.get("/get-Faqs",verifyAdminToken, getAllFaqs);

/* ------------------------- delete all FAQS route ------------------------ */
router.delete("/delete-Faqs/:id",verifyAdminToken, deleteFaqs);

/* ------------------------- add FAQS route ------------------------ */
router.put("/update-Faqs/:id",verifyAdminToken, updateFaqs);


module.exports = router;