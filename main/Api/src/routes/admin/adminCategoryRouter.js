const express = require("express");
const { singleFileUpload } = require("../../helper/upload");
const {
  addCategory,
  getCategory,
  deleteCategory,
  updateCategory,
  getCategoryByLanguage,
  updateCategoryStatus,
} = require("../../controllers/admin/adminCategoryContoller");
const verifyAdminToken = require("../../helper/verifyAdminToken");
const router = express.Router();

/* ----------------------- add category route ----------------------- */
router.post(
  "/add-category",
  verifyAdminToken,
  singleFileUpload("/category-images/", "categoryImage"),
  addCategory
);

/* ----------------------- get category route ----------------------- */
router.get("/get-category",verifyAdminToken, getCategory);

/* ----------------------- delete category route  ----------------------- */
router.delete("/delete-Category/:id",verifyAdminToken, deleteCategory);

/* ----------------------- update category route  ----------------------- */
router.put(
  "/update-Category/:id",verifyAdminToken,
  singleFileUpload("/category_images/", "categoryImage"),
  updateCategory
);

router.get("/getCatByLanguage/:languageId",verifyAdminToken, getCategoryByLanguage);

router.put("/update-Status/:id",verifyAdminToken, updateCategoryStatus);

module.exports = router;
