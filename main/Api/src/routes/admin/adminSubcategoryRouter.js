const express = require("express");
const { addSubCategory, getSubCategory, deleteSubCategory, updateSubCategory, getSubCateByCategory, updateSubCateStatus, deleteMultiSubCate } = require("../../controllers/admin/adminSubCategoryContro");
const verifyAdminToken = require("../../helper/verifyAdminToken");

const router = express.Router();

/* ----------------------- add sub-category route ----------------------- */
router.post("/add-subCategory", verifyAdminToken, addSubCategory);


/* ----------------------- get sub-category route ----------------------- */
router.get("/get-subCategory", verifyAdminToken, getSubCategory);

/* ----------------------- delete sub-category route  ----------------------- */
router.delete("/delete-subCategory/:id", verifyAdminToken, deleteSubCategory);

/* ----------------------- update sub-category route  ----------------------- */
router.put("/update-subCategory/:id", verifyAdminToken, updateSubCategory);

/* ----------------------- update sub-category status  ----------------------- */
router.put("/update-Status/:id", verifyAdminToken, updateSubCateStatus);

/* ----------------------- delete multiple sub-category route  ----------------------- */
router.delete("/multidelete-subCategory", verifyAdminToken, deleteMultiSubCate);

/* ----------------------- get sub-category By category route ----------------------- */
router.get(
  "/getSubCatByCate/:categoryId",
  verifyAdminToken,
  getSubCateByCategory
);


module.exports = router;
