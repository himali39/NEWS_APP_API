const Category = require("../../models/categoryModel");

/* -------------------------------add Personalize data------------------------------ */

// const addCategory = async (req, res) => {
//   try {
//     const reqbody = req.body;

//     if (req.file) {
//       reqbody.image = req.file.filename;
//     }

//          /** create category using model */
//     const category = await Category.create(reqbody);

//     if (!category) {
//       return res.status(404).json({ message: "category data not found" });
//     }
//     res.status(200).json({
//       success: true,
//       message: `category data add successfully!`,
//       data: category,
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
/* ----------------------------- Get personalize data ----------------------------- */
const getCategory = async (req, res) => {
  try {
    const CategoryData = await Category.find().populate("subCategoryName");

    if (!CategoryData) {
      return res.status(404).json({ message: "Category  data not found" });
    }

    res.status(200).json({
      success: true,
      message: "get all Category data ",
      personalize: CategoryData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};





module.exports = { getCategory };
