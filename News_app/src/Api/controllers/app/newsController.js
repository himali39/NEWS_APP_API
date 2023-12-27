const News = require("../../models/newsModel");

/* ----------------------------- Get News data ----------------------------- */
const allnewsList = async (req, res) => {
  try {
    const newsData = await News.find().populate("tag_Name");
    //   {
    //   path: "Tag", //model name
    //   select: ["tag_Name"], //felied name
    // });

    // if (!newsData) {
    //   return res.status(404).json({ message: "News list ata not found" });
    // }
    res.status(200).json({
      success: true,
      message: "News data get successfully ",
      data: newsData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* ----------------------------- Get particuler News data ----------------------------- */
const getNewsById = async (req, res) => {
  try {
    const newsData = await News.findById(req.params.id);

    if (!newsData) {
      return res.status(404).json({ message: "News list ata not found" });
    }

    res.status(200).json({
      success: true,
      message: "Get News data successfully ",
      personalize: newsData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* ----------------------------- Get particuler News search data ----------------------------- */
const searchNews = async (req, res) => {
  try {
    const { query } = req.query;

    // Use a regular expression for case-insensitive search
    const regex = new RegExp(query, "i");

    // Perform the search
    const results = await News.find({
      $or: [{ tag: regex }, { title: regex }],
    });

    if (!results || results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No matching news found for the given result.",
      });
    }

    // If results are found, return a success response with the search results
    res.status(200).json({
      success: true,
      message: "News data retrieved successfully.",
      searchResults: results,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

/* ----------------------------- Get tranding hashtag News List ----------------------------- */
const getTrandingTagList = async (req, res) => {
  try {
    const newsData = await News.findOne({ tag: tag });

    if (!newsData) {
      throw new Error(`No news tag data found`);
    }

    // If results are found, return a success response with the search results
    res.status(200).json({
      success: true,
      message: "News data retrieved successfully.",
      searchResults: results,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
module.exports = { allnewsList, getNewsById, searchNews, getTrandingTagList };
