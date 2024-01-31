const express = require("express");
const { addSubCategory, getSubCategory, deleteSubCategory, updateSubCategory, getSubCateByCategory, updateSubCateStatus } = require("../../controllers/admin/adminSubCategoryContro");

const router = express.Router();

/* ----------------------- add sub category route ----------------------- */
router.post("/add-subCategory", addSubCategory);


/* ----------------------- get sub category route ----------------------- */
router.get("/get-subCategory", getSubCategory);

/* ----------------------- delete sub category route  ----------------------- */
router.delete("/delete-subCategory/:id", deleteSubCategory);

/* ----------------------- update sub category route  ----------------------- */
router.put("/update-subCategory/:id", updateSubCategory);

/* ----------------------- update sub category status  ----------------------- */
router.put("/update-Status/:id", updateSubCateStatus);

/* ----------------------- get sub category By category route ----------------------- */
router.get("/getSubCatByCate/:categoryId", getSubCateByCategory);


module.exports = router;
