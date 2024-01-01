
const Languages = require("../../models/languagesModel");
const User = require("../../models/userModel");

/* ----------------------------- Get Language data ----------------------------- */
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



const updateAppLanguage= async (req, res) => {
  try {
    const { userId, newLanguageId } = req.body;

    // Validate input parameters
    if (!userId || !newLanguageId) {
      throw new Error("Invalid input parameters");
    }

    // Find the user by ID
    let updatedUser = await User.findById(userId);

    if (!updatedUser) {
      throw new Error("User not found");
    }

    updatedUser = await User.findByIdAndUpdate(
      userId,
      { newLanguageId: updatedUser.language },
      { new: true }
    );
   
    res.status(200).json({
      success: true,
      updateData: updatedUser,
      message: "User language updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = { getLanguage, updateAppLanguage };
