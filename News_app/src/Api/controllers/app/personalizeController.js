const Personalize = require("../../models/personalizeModel");

/* ----------------------------- Get personalize data ----------------------------- */
const getpersonalize = async (req, res) => {
  try {
    const personalizeData = await Personalize.find();

    // const List = personalize.map((personalize) => personalize.name);

    if (!personalizeData) {
      return res.status(404).json({ message: "personalize data not found" });
    }

    res.status(200).json({
      success: true,
      message: "get all personalize data ",
      personalize: personalizeData,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { getpersonalize };
