const Languages = require("../../models/languagesModel");

const addlanguage = async (req, res) => {
  try {
    const reqbody = req.body;
    // console.log(reqbody);
    // console.log(req.files);

    if (req.files["json_file"]) {
      reqbody.json_file = req.files["json_file"][0].filename;
    }

    if (req.files["flag_image"]) {
      reqbody.flag_image = req.files["flag_image"][0].filename;
    }
    console.log(reqbody);
    // /** create user using createUser service */
    const language = await Languages.create(reqbody);

    if (!language) {
      return res.status(404).json({ message: "language data not found" });
    }
    res.status(200).json({
      success: true,
      message: `language data add successfully!`,
      data: language,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = { addlanguage };
