const Category = require("../../models/categoryModel");
const News = require("../../models/newsModel");
const User = require("../../models/userModel");

/* ----------------------------- Get Category data ----------------------------- */
const getDashboradCount = async (req, res) => {
  try {
    const categoryData = await Category.countDocuments();
    const newsData = await News.countDocuments();
    const userData = await User.countDocuments();

    const countedData = {
      categoryData: categoryData,
      newsData: newsData,
      userData: userData,
    };

    res.status(200).json({
      success: true,
      message: "get all Data ",
      data: countedData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// API endpoint to get the total count of active and inactive users
// const getStatuswiseUserCount = async (req, res) => {
//   try {
//     const users = await User.find();
//     const activeCount = users.filter((user) => user.status).length;
//     const inactiveCount = users.length - activeCount;

//     const result = { activeCount: activeCount, inactiveCount: inactiveCount };
//     successResponse(res, result);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  getDashboradCount,
};
