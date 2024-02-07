const News = require("../../models/newsModel");
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

    // all news data id find
    const news = await News.find({ subcategory: req.params.id });

    // Extracting newsIds from the news array
    const newsIds = news.map((news) => news._id);

    await News.deleteMany({
      _id: { $in: newsIds },
    });

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

/* ----------------------------- update sub Category data ----------------------------- */
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

/* ----------------------- Multiple User delete ---------------------- */
const deleteMultiSubCate = async (req, res) => {
  try {
    const { ids } = req.body;

    const subCateData = await subCategory.find({ _id: { $in: ids } });

  
    const deleteResult = await subCategory.deleteMany({ _id: { $in: ids } });

    // Check if any subCategorys were deleted
    if (deleteResult.deletedCount === 0) {
      throw new Error("subCategory not Found");
    }

    res.status(200).json({
      success: true,
      message: "subCategory deleted successfully!",
      subCategory: subCateData,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* --------------------------- Update Sub category Status --------------------------- */
const updateSubCateStatus = async (req, res, next) => {
  try {
   
    const subCateData = await subCategory.findById(req.params.id);

    if (!subCateData) {
      return res.status(404).json({ message: "Sub Category data not found" });
    }
    subCateData.status = !subCateData.status;

    const updatedStatus = await subCateData.save();

    res.status(200).json({
      success: true,
      message: "Sub Category update status successfully",
      news: updatedStatus,
    });

  } catch (err) {
    next(err);
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
        category: categoryId,
      })
      .populate("category");

    if (!subCategoryData || subCategoryData.length === 0) {
      return res.status(400).json({
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
  deleteMultiSubCate,
  getSubCateByCategory,
  updateSubCateStatus,
};
