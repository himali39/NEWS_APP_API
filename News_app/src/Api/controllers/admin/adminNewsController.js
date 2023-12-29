const News = require("../../models/newsModel");

/* -------------------------------add Personalize data------------------------------ */
const addNews = async (req, res) => {
  try {
    console.log("fileeee")
    // const reqbody = req.body;

    // if (req.file) {
    //   reqbody.news_image = req.file.filename;
    // }
    // console.log(req.files);

    // if (req.files && req.files.length > 0) {
    //   req.files.forEach((file) => {
    //     reqbody.multipleImage.push(file.filename);
    //   });
    // }
    // const newsData = await News.create(reqbody);
    // console.log(newsData);
    // if (!newsData) {
    //   return res.status(404).json({ message: "News Data not found" });
    // }
    // res.status(200).json({
    //   success: true,
    //   message: `News Data data add successfully!`,
    //   data: newsData,
    // });
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
    const newsData = await News.find().populate([
      {
        path: "tag_name",
        select: ["name"],
      },
      {
        path: "category",
        select: ["name"],
      },
      {
        path: "sub_category",
        select: ["subCategory_name"],
      },
      {
        path: "location",
        select: ["location_name"],
      },
      {
        path: "languages",
        select: ["name"],
      },
    ]);

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
