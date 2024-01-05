const Admin = require("../../models/adminModel");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const refreshSecret = process.env.JWT_REFRESH_SECRET_KEY;
const accessSecret = process.env.JWT_SECRECT_KEY;
const bcrypt = require("bcrypt");

/* ----------------------------- Admin Register ----------------------------- */
const adminRegister = async (req, res) => {
  try {
    const reqbody = req.body;

    if (req.file) {
      reqbody.profileImage = req.file.filename;
    }
    
    const newAdmin = await Admin.create(reqbody);

    res.status(201).json({
      message: "admin data created successfully!",
      admin: newAdmin,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
/* ------------------------------- admin Login ------------------------------- */
const adminLogin = async (req, res) => {
  try {
    let { email, name, password } = req.body;

    /** find email and mobile number existence */
    const findAdmin = await Admin.findOne({
      $or: [{ email: email }],
    });

    if (!findAdmin) {
      throw new Error("Admin not Found");
    }

    /**compare password   */
    const successPassword = await bcrypt.compare(password, findAdmin.password);

    if (!successPassword) throw Error("Inccorect Password");

    /**create Token */
    let payload = {
      name,
      email,
      expiresIn: moment().add(10, "minutes").unix(),
    };

    /**create accesstoken */
    let accessToken;

    if (findAdmin && successPassword) {
      accessToken = await jwt.sign(payload, process.env.JWT_SECRECT_KEY);
      findAdmin.accessToken = accessToken;
    }

    /**generate Refresh token */
    const generateRefreshToken = (payload) => {
      return jwt.sign(payload, refreshSecret);
    };
    const refreshToken = generateRefreshToken(payload);

    res.status(200).json({
      success: true,
      message: `Admin Login successfully!`,
      findAdmin: findAdmin,
      refreshToken: refreshToken,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  adminRegister,
  adminLogin,
};
