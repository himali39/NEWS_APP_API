const Languages = require("../../models/languagesModel");

/* --------------------------- add Languages data --------------------------- */
const addLanguage = async (req, res) => {
 
  try {
    const reqbody = req.body;

    if (req.files["json_file"][0]) {
      reqbody.json_file = req.files["json_file"][0].filename;
    }
    if (req.files["flag_image"][0]) {
      reqbody.flag_image = req.files["flag_image"][0].filename;
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

module.exports = { addLanguage, getLanguage };
