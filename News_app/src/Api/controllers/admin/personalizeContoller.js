const Personalize = require("../../models/personalizeModel");

/* -------------------------------add Personalize data------------------------------ */
const addPersonalize = async (req, res) => {
  try {
    const reqbody = req.body;

    if (req.file ) {
      reqbody.image = req.file.filename;
    }
   
    /** create user using createUser service */
    const personalize = await Personalize.create(reqbody);

    if (!personalize) {
      return res.status(404).json({ message: "Personalize data not found" });
    }
    res.status(200).json({
      success: true,
      message: `Personalize data add successfully!`,
      data: personalize,
    });
    
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { addPersonalize };
