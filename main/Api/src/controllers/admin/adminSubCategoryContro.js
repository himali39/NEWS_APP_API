const subCategory = require("../../models/subCategoryModel");

/* -------------------------------add sub-Category data------------------------------ */
const addSubCategory = async (req, res) => {
  try {
    const reqbody = req.body;

    /** create subcategory using model */
    const subCategory_Data = await subCategory.create(reqbody);

    if (!subCategory_Data) {
      return res.status(404).json({ message: "sub Category data not found" });
    }
    res.status(200).json({
      success: true,
      message: `sub Category data add successfully!`,
      data: subCategory_Data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* ----------------------------- Get sub-Category data ----------------------------- */
const getSubCategory = async (req, res) => {
  try {
    const subCategoryData = await subCategory
      .find()
      .populate("languages")
      .populate("category");

    if (!subCategoryData) {
      return res.status(404).json({ message: "sub Category  data not found" });
    }

    res.status(200).json({
      success: true,
      message: "get all subCategory data ",
      subCategory: subCategoryData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* ----------------------------- delete Category data ----------------------------- */
const deleteSubCategory = async (req, res) => {
  try {
    const subCategoryData = await subCategory.findById(req.params.id);

    if (!subCategoryData) {
      return res
        .status(404)
        .json({ message: "subCategoryData  data not found" });
    }

    const deleteCateData = await subCategory.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Sub category data deleted successfully",
      subcategory: deleteCateData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* ----------------------------- update Category data ----------------------------- */
const updateSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const CategoryData = await subCategory.findById(id);

    if (!CategoryData) {
      return res.status(404).json({ message: "sub Category data not found" });
    }

    const updateCateData = await subCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateCateData) {
      throw new Error("Something went wrong, try again later");
    }

    res.status(200).json({
      success: true,
      message: "Sub category data deleted successfully",
      subCategory: updateCateData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* ----------- selected categoryId through get subcategory data list in news form----------- */
const getSubCateByCategory = async (req, res) => {
  try {
    // Get category Id  from the request parameters
    const categoryId = req.params.categoryId;

    if (!categoryId) {
      return res.status(400).json({
        message: "category ID is required for filtering subCategories",
      });
    }

    const subCategoryData = await subCategory
      .find({
        categoryName: categoryId,
      })
      .populate("categoryName");

    if (!subCategoryData || subCategoryData.length === 0) {
      return res.status(200).json({
        message: "No subCategories found for the given category ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Get subCategory data based on category ID",
      subCategory: subCategoryData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addSubCategory,
  getSubCategory,
  deleteSubCategory,
  updateSubCategory,
  getSubCateByCategory,
};
