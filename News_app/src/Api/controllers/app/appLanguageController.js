
const Languages = require("../../models/languagesModel");

/* ----------------------------- Get personalize data ----------------------------- */
const getLanguage = async (req, res) => {
  try {
    const listLanguage = await Languages.find();

    if (!listLanguage) {
      return res.status(404).json({ message: "Languages  data not found" });
    }

    res.status(200).json({
      success: true,
      message: "Languages data get successfully ",
      personalize: listLanguage,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { getLanguage };
