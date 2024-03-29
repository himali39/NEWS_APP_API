const News = require("../../models/newsModel");

/* -------------------------------add Personalize data------------------------------ */
const addNews = async (req, res) => {
  try {
    const reqbody = req.body;

    if (req.files.newsImage && req.files.newsImage[0].filename != "undefined") {
      reqbody.newsImage = req.files.newsImage[0].filename;
    }

    if (req.files.multipleImage) {
      reqbody.multipleImage = req.files.multipleImage.map(
        (file) => file.filename
      );
    }

    if (req.files.video && req.files.video[0].filename != "undefined") {
      reqbody.video = req.files.video[0].filename;
    }

    const newsData = await News.create(reqbody);
    if (!newsData) {
      return res.status(404).json({ message: "News Data not found" });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: `News Data data add successfully!`,
      data: newsData,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
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
        path: "languages",
        select: ["languagesName"],
      },
      {
        path: "category",
        select: ["categoryName"],
      },
      {
        path: "subcategory",
        select: ["subCategoryName"],
      },
      {
        path: "tag",
        select: ["tagName"],
      },
      {
        path: "location",
        select: ["locationName"],
      },
    ]);

    if (!newsData) {
      return res.status(404).json({ message: "News list ata not found" });
    }

    const baseUrl =
      req.protocol + "://" + req.get("host") + process.env.BASE_URL_NEWS_PATH;
    res.status(200).json({
      status: 200,
      success: true,
      message: "News data get successfully ",
      news: newsData,
      baseUrl: baseUrl,
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
const deleteNews = async (req, res) => {
  try {
    const newsData = await News.findById(req.params.id);

    if (!newsData) {
      return res.status(404).json({ message: "News data not found" });
    }
     deleteFiles("News_image/" + newsData.newsImage);
 
     deleteFiles("News_image/" + newsData.multipleImage);

     deleteFiles("News_image/" + newsData.video);

    const deleteNews = await News.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 200,
      success: true,
      message: "News data deleted successfully",
      Location: deleteNews,
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
const updateNews = async (req, res) => {
  try {
    const reqbody = req.body;
    const newsData = await News.findById(req.params.id);

    if (!newsData) {
      return res.status(404).json({ message: "News data not found" });
    }

    if (req.files.newsImage) {
      reqbody.newsImage = req.files.newsImage[0].filename;
    }

    if (req.files.multipleImage) {
      reqbody.multipleImage = req.files.multipleImage.map(
        (file) => file.filename
      );
    }
    if (req.files.video) {
      reqbody.video = req.files.video[0].filename;
    }
    const updateNews = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "News data update successfully",
      News: updateNews,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      success: false,
      message: error.message,
    });
  }
};

/* ----------------------- Multiple Category delete ---------------------- */
const deleteMultipleNews = async (req, res) => {
  try {
    const { ids } = req.body;

    const newsData = await News.find({ _id: { $in: ids } });

    // Check if any news data is found
    if (newsData.length === 0) {
      throw new Error("news not Found");
    }
    // Extract newsImage from news data and delete files
    newsData.forEach((news) => {
      deleteFiles("/News_image/" + news.newsImage);
    });

    const deleteResult = await News.deleteMany({ _id: { $in: ids } });

    // Check if any news were deleted
    if (deleteResult.deletedCount === 0) {
      throw new Error("news not Found");
    }

    res.status(200).json({
      success: true,
      message: "news deleted successfully!",
      news: newsData,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* --------------------------- Update News Status --------------------------- */
const updateNewsStatus = async (req, res, next) => {
  try {
    const newsData = await News.findById(req.params.id);

    if (!newsData) {
      return res.status(404).json({ message: "News data not found" });
    }

    newsData.status = !newsData.status;

    const updatedStatus = await newsData.save();

    res.status(200).json({
      success: true,
      message: "News data update successfully",
      news: updatedStatus,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addNews,
  allNewsList,
  deleteNews,
  updateNews,
  deleteMultipleNews,
  updateNewsStatus,
};
