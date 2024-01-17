const express = require("express");
const { addSubCategory, getSubCategory, deleteSubCategory, updateSubCategory } = require("../../controllers/admin/adminSubCategoryContro");

const router = express.Router();

/* ----------------------- add sub category route ----------------------- */
router.post("/add-subCategory", addSubCategory);


/* ----------------------- get sub category route ----------------------- */
router.get("/get-subCategory", getSubCategory);

/* ----------------------- delete sub category route  ----------------------- */
router.delete("/delete-subCategory/:id", deleteSubCategory);

/* ----------------------- update sub category route  ----------------------- */
router.put("/update-subCategory/:id", updateSubCategory);

module.exports = router;
