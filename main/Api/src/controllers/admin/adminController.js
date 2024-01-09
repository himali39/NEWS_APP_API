const Admin = require("../../models/adminModel");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const refreshSecret = process.env.JWT_REFRESH_SECRET_KEY;
const accessSecret = process.env.JWT_SECRECT_KEY;
const bcrypt = require("bcrypt");
const ejs = require("ejs");
const { generateOTP, sendMail } = require("../../helper/emailsend");
const crypto = require("crypto");
const email_URL = process.env.Email_URL;
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
    const admin = await Admin.findOne({
      $or: [{ email: email }],
    });

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "admin not found." });
    }

    /**compare password   */
    const successPassword = await bcrypt.compare(password, admin.password);

    if (!successPassword) throw Error("Inccorect Password");

    /**create Token */
    let payload = {
      name,
      email,
      expiresIn: moment().add(10, "minutes").unix(),
    };

    /**create accesstoken */
    let accessToken;

    if (admin && successPassword) {
      accessToken = await jwt.sign(payload, process.env.JWT_SECRECT_KEY);
      admin.accessToken = accessToken;
    }

    /**generate Refresh token */
    const generateRefreshToken = (payload) => {
      return jwt.sign(payload, refreshSecret);
    };
    const refreshToken = generateRefreshToken(payload);

    res.status(200).json({
      success: true,
      message: `Admin Login successfully!`,
      admin: admin,
      refreshToken: refreshToken,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* ------------------------------- admin Forgot password ------------------------------- */
const forgotPasswordEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email Id" });

    let resetCode = crypto.randomBytes(32).toString("hex");

    const otp = generateOTP(); //generate otp code emailService through generate
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration

    admin.otp = {
      value: otp,
      expiration: expirationTime,
    };

    // Save the OTP in the user document
    admin.otp = otp; //otp is admin model key name
    admin.resetCode = resetCode;
    await admin.save();

    // Render the EJS template
    const emailTemplate = await ejs.renderFile(
      "../Api/src/views/email_otp.ejs",
      {
        otp,
        otpURL: `${email_URL}reset-password/${resetCode}/${admin._id}`,
      }
    );
    // "/home/himali/Documents/NEWS_APP_main/main/Api/src/views/email_otp.ejs",

    // send mail service is use by email service
    sendMail(
      process.env.EMAIL_FROM,
      admin.email,
      emailTemplate,
      "Password Reset OTP"
    );

    res.status(200).json({
      success: true,
      message: `Check your email for Reset password`,
    });
  } catch (err) {
    next(err);
    // res.status(500).json({
    //   success: false,
    //   message: err.message,
    // });
  }
};

/* ----------------------------- Reset Password ----------------------------- */

const resetPassword = async (req, res) => {
  const {  otp, newPassword, confirmPassword } = req.body;

  try {
    // Find the user by email and verify OTP
    const admin = await Admin.findOne({_id:req.body.id})
   

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "admin not found." });
    }

    // Check if OTP is valid and not expired
    if (admin.otp != otp || admin.otpExpiration < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match.",
      });
    }

    // Update the user's password and clear the OTP and reset OTP expiration
    admin.password = newPassword;
    admin.otp = null;
    admin.otpExpiration = null;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  adminRegister,
  adminLogin,
  forgotPasswordEmail,
  resetPassword,
};
