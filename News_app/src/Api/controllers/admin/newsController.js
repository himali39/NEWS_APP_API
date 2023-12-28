const News = require("../../models/newsModel");

/* -------------------------------add Personalize data------------------------------ */
const addNews = async (req, res) => {
  try {
    const reqbody = req.body;
    console.log("🚀 ~  reqbody:", reqbody)

    if (req.file) {
      reqbody.news_image = req.file.filename;
    }

    const newsData = await News.create(reqbody);

    if (!newsData) {
      return res.status(404).json({ message: "News Data not found" });
    }
    res.status(200).json({
      success: true,
      message: `News Data data add successfully!`,
      data: newsData,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* ----------------------------- Get News data ----------------------------- */
const allNewsList = async (req, res) => {
  try {
    const newsData = await News.find().populate("tag_name");
  
    if (!newsData) {
      return res.status(404).json({ message: "News list ata not found" });
    }
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

module.exports = { addNews, allNewsList };
