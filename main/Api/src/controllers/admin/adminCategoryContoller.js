const Category = require("../../models/categoryModel");
const deleteFiles = require("../../helper/deleteFile");
const mongoose = require("mongoose");
const subCategory = require("../../models/subCategoryModel");
const News = require("../../models/newsModel");

/* -------------------------------add Personalize data------------------------------ */
const addCategory = async (req, res) => {
  try {
    const reqbody = req.body;

    if (req.file && req.file.filename != "undefined") {
      reqbody.categoryImage = req.file.filename;
    }

    /** create category using model */
    const category = await Category.create(reqbody);

    if (!category) {
      return res.status(404).json({ message: "category data not found" });
    }
    res.status(200).json({
      status:200,
      success: true,
      message: `category data add successfully!`,
      data: category,
    });
  } catch (err) {
    res.status(400).json({
      status:400,
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
      status: 200,
      success: true,
      message: "get all Category data ",
      category: CategoryData,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
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

    // all subCategory  id find
    const subCate = await subCategory.find({ category: req.params.id });

    // Extracting subcategory IDs from the subCate array
    const subCategoryIds = subCate.map((sub) => sub._id);

    await subCategory.deleteMany({
      _id: { $in: subCategoryIds },
    });

    // all news data id find
    const news = await News.find({ category: req.params.id });

    // Extracting newsIds from the news array
    const newsIds = news.map((news) => news._id);

    await News.deleteMany({
      _id: { $in: newsIds },
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Category data deleted successfully",
      category: deleteCateData,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
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
      req.body.categoryImage = req.file.filename;
    }

    const updateCateData = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateCateData) {
      throw new Error("Something went wrong, try again later");
    }

    res.status(200).json({
      status:200,
      success: true,
      message: "Category data deleted successfully",
      category: updateCateData,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      success: false,
      message: error.message,
    });
  }
};

/* ----------------------- Multiple User delete ---------------------- */
const deleteMultipleCategory = async (req, res) => {
  try {
    const { ids } = req.body;

    const categoryData = await Category.find({ _id: { $in: ids } });

    // Check if any category data is found
    if (categoryData.length === 0) {
      throw new Error("category not Found");
    }
    // Extract categoryImage from category data and delete files
    categoryData.forEach((category) => {
      deleteFiles("/category-images/" + category.categoryImage);
    });
    const deleteResult = await Category.deleteMany({ _id: { $in: ids } });

    // Check if any categorys were deleted
    if (deleteResult.deletedCount === 0) {
      throw new Error("category not Found");
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "category deleted successfully!",
      category: categoryData,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      success: false,
      message: err.message,
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
        .json({ message: "Language is required for categories" });
    }

    const CategoryData = await Category.find({
      languages: languageId,
    }).populate("languages");

    if (!CategoryData || CategoryData.length === 0) {
      return res
        .status(400)
        .json({ message: "No categories found for the given Language" });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Get categories data based on Language",
      category: CategoryData,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      success: false,
      message: error.message,
    });
  }
};

/* --------------------------- Update News Status --------------------------- */
const updateCategoryStatus = async (req, res) => {
  try {
    const categoryData = await Category.findById(req.params.id);

    if (!categoryData) {
      return res.status(404).json({ message: "Category data not found" });
    }

    categoryData.status = !categoryData.status;

    const updatedStatus = await categoryData.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Category update status successfully",
      news: updatedStatus,
    });
  } catch (err) {
   res.status(404).json({
     status: 404,
     success: false,
     message: err.message,
   });
  }
};

module.exports = {
  addCategory,
  getCategory,
  deleteCategory,
  updateCategory,
  deleteMultipleCategory,
  getCategoryByLanguage,
  updateCategoryStatus,
};
