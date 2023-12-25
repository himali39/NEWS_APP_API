

/* ------------------------------- User Login ------------------------------- */

const addPersonalize = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: `User Login successfully!`,
      otp: otp,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { addPersonalize }