const Category = require("../../models/categoryModel");
const deleteFiles = require("../../helper/deleteFile");
const mongoose = require("mongoose");
/* -------------------------------add Personalize data------------------------------ */

const addCategory = async (req, res) => {
  try {
    const reqbody = req.body;

    if (req.file) {
      reqbody.categoryImage = req.file.filename;
    }

    /** create category using model */
    const category = await Category.create(reqbody);

    if (!category) {
      return res.status(404).json({ message: "category data not found" });
    }
    res.status(200).json({
      success: true,
      message: `category data add successfully!`,
      data: category,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* ----------------------------- Get Category data ----------------------------- */
const getCategory = async (req, res) => {
  try {
    const CategoryData = await Category.find().populate("languages");

    if (!CategoryData) {
      return res.status(404).json({ message: "Category  data not found" });
    }

    res.status(200).json({
      success: true,
      message: "get all Category data ",
      category: CategoryData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* ----------------------------- delete Category data ----------------------------- */
const deleteCategory = async (req, res) => {
  try {
    const CategoryData = await Category.findById(req.params.id);

    if (!CategoryData) {
      return res.status(404).json({ message: "Category  data not found" });
    }

    deleteFiles("category-images/" + CategoryData.categoryImage);

    const deleteCateData = await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Category data deleted successfully",
      category: deleteCateData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* ----------------------------- update Category data ----------------------------- */
const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const CategoryData = await Category.findById(id);

    if (!CategoryData) {
      return res.status(404).json({ message: "Category data not found" });
    }
    if (req.file && req.file != "undefined") {
      req.body.image = req.file.filename;
    }

    const updateCateData = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateCateData) {
      throw new Error("Something went wrong, try again later");
    }

    res.status(200).json({
      success: true,
      message: "Category data deleted successfully",
      category: updateCateData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* ----------- selected languageId through get category data list in news form----------- */
const getCategoryByLanguage = async (req, res) => {
  try {
    // Get language ID from the request parameters or query string
    const languageId = req.params.languageId;

    if (!languageId) {
      return res
        .status(400)
        .json({ message: "Language ID is required for filtering categories" });
    }

    const CategoryData = await Category.find({
      languages: languageId,
    }).populate("languages");

    if (!CategoryData || CategoryData.length === 0) {
      return res
        .status(400)
        .json({ message: "No categories found for the given language ID" });
    }

    res.status(200).json({
      success: true,
      message: "Get categories data based on language ID",
      category: CategoryData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* --------------------------- Update News Status --------------------------- */
const updateCategoryStatus = async (req, res, next) => {
  try {
   
    const categoryData = await Category.findById(req.params.id);

    if (!categoryData) {
      return res.status(404).json({ message: "Category data not found" });
    }

    categoryData.status = !categoryData.status;

    const updatedStatus = await categoryData.save();

    res.status(200).json({
      success: true,
      message: "Category data update successfully",
      news: updatedStatus,
    });

  } catch (err) {
    next(err);
  }
};
module.exports = {
  addCategory,
  getCategory,
  deleteCategory,
  updateCategory,
  getCategoryByLanguage,
  updateCategoryStatus,
};
