const Category = require("../../models/categoryModel");
const News = require("../../models/newsModel");
const User = require("../../models/userModel");
const Languages = require("../../models/languagesModel");

/* ----------------------------- Get Category data ----------------------------- */
const getDashboradCount = async (req, res) => {
  try {
    const categoryData = await Category.countDocuments();
    const newsData = await News.countDocuments();
    const userData = await User.countDocuments();
    const languageData = await Languages.countDocuments();

    const countedData = {
      categoryData: categoryData,
      newsData: newsData,
      userData: userData,
      languageData: languageData,
    };

    res.status(200).json({
      status:200,
      success: true,
      message: "get all Data ",
      data: countedData,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      success: false,
      message: error.message,
    });
  }
};

const getCategoryWiseNewsCount = async (req, res) => {
  try {
    const categories = await Category.find();
    const categoryNewsCount = [];

    const totalNewsCount = await News.countDocuments();

    for (const category of categories) {
      const newsCountForCategory = await News.countDocuments({
        category: category._id,
      });

      // Calculate percentage
      const percentage = (newsCountForCategory / totalNewsCount) * 100;

      // Store category-wise news count, percentage, and name
      categoryNewsCount.push({
        category: category.categoryName,
        count: newsCountForCategory,
        percentage: percentage.toFixed(2),
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Category-wise news count and percentage",
      data: categoryNewsCount,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      success: false,
      message: error.message,
    });
  }
};

const getLanguageWiseNewsCount = async (req, res) => {
  try {
    const languageNewsCount = await News.aggregate([
      {
        $group: {
          _id: "$languages",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "languages", // Assuming your language model is named "languages"
          localField: "_id",
          foreignField: "_id",
          as: "languageData",
        },
      },
      {
        $unwind: "$languageData",
      },
      {
        $project: {
          language: "$languageData.languagesName",
          count: 1,
        },
      },
    ]);
    res.status(200).json({
      status: 200,
      success: true,
      message: "Language-wise all news count",
      data: languageNewsCount,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboradCount,
  getCategoryWiseNewsCount,
  getLanguageWiseNewsCount,
};
