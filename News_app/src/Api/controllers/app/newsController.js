const News = require("../../models/newsModel");

/* ----------------------------- Get News data ----------------------------- */
const allnewsList = async (req, res) => {
  try {
    const newsData = await News.find();

    // const List = personalize.map((personalize) => personalize.name);

    if (!newsData) {
      return res.status(404).json({ message: "News list ata not found" });
    }
    res.status(200).json({
      success: true,
      message: "News data get successfully ",
      personalize: newsData,
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
      message: "News data get successfully ",
      personalize: newsData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { allnewsList, getNewsById };
