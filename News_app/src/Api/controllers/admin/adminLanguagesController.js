const Languages = require("../../models/languagesModel");

/* --------------------------- add Languages data --------------------------- */
const addLanguage = async (req, res) => {
 
  try {
    const reqbody = req.body;

    if (req.files["jsonFile"][0]) {
      reqbody.jsonFile = req.files["jsonFile"][0].filename;
    }
    
    if (req.files["flagImage"][0]) {
      reqbody.flagImage = req.files["flagImage"][0].filename;
    }

    const addData = await Languages.create(reqbody);

    if (!addData) {
      return res.status(404).json({ message: "language data not found" });
    }
    res.status(200).json({
      success: true,
      message: "language data add successfully!",
      data: addData,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* ---------------------------- list of Languages --------------------------- */
const getLanguage = async (req, res) => {
  try {
    const LanguageData = await Languages.find();

    if (!LanguageData) {
      return res.status(404).json({ message: "Language Data not found" });
    }

    res.status(200).json({
      success: true,
      message: "List of Language Data successfully ",
      personalize: LanguageData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateNewsLanguage = async (req, res) => {
  try {
    const { newsId, languageId, categoryIds } = req.body;

    // Validate input parameters
    if (
      !newsId ||
      !languageId ||
      !categoryIds ||
      categoryIds.length === 0 ||
      categoryIds.length > 3
    ) {
      throw new Error("Invalid input parameters");
    }

    // Find the news item by ID
    let updatedNews = await News.findById(newsId);

    // Check if the news item exists
    if (!updatedNews) {
      throw new Error("News not found");
    }

    // Update the language
    updatedNews.languages = [languageId];

    // Update the categories (up to three categories)
    updatedNews.categories = categoryIds.slice(0, 3);

    // Save the updated news item
    updatedNews = await updatedNews.save();

    res.status(200).json({
      success: true,
      updateData: updatedNews,
      message: "News language updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = { addLanguage, getLanguage };
