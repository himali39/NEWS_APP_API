const User = require("../../models/userModel");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const refreshSecret = process.env.JWT_REFRESH_SECRET_KEY;
const bcrypt = require("bcrypt");
const ejs = require("ejs");
const { sendMail } = require("../../helper/emailsend");

/* ---------------------------- Register User Data ---------------------------- */
const signupUser = async (req, res) => {
  try {
    const reqbody = req.body;

    // Check if both password and confirm_password are present
    if (!reqbody.password || !reqbody.confirm_password) {
      throw new Error(`Both password and confirm_password are required`);
    }

    /** find email and mobile number existence */
    const existingUser = await User.findOne({
      $or: [{ email: reqbody.email }, { mobile: reqbody.mobile }],
    });

    if (existingUser) {
      // throw new Error(`Email or mobile number already in use`);
    }

    /** validate password and confirm password equality */
    if (reqbody.password !== reqbody.confirm_password) {
      throw new Error(`Password and confirm password do not match`);
    }

    /** create access token */
    const payload = {
      name: reqbody.name,
      email: reqbody.email,
      expiresIn: moment().add(5, "minutes").unix(),
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRECT_KEY);

    /** generate Refresh Token */
    const generateRefreshToken = (payload) => {
      return jwt.sign(payload, refreshSecret);
    };

    const refreshToken = generateRefreshToken(payload);

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password,

      accessToken: accessToken,
    };

    /** create user using createUser service */
    const user = await User.create(newUser);

    res.status(201).json({
      message: "User data created successfully!",
      data: user,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* ------------------------------- User Login ------------------------------- */

const loginUser = async (req, res) => {
  try {
    let { email, mobile, password } = req.body;

    /** find email and mobile number existence */
    const findUser = await User.findOne({
      $or: [{ email: email }, { mobile: mobile }],
    });

    if (!findUser) {
      throw new Error("User not Found");
    }

    /**compare password   */
    const successPassword = await bcrypt.compare(password, findUser.password);

    if (!successPassword) throw Error("Inccorect Password");

    /**create Token */
    let payload = {
      email,
      expiresIn: moment().add(10, "minutes").unix(),
    };

    /**create accesstoken */
    let accessToken;

    if (findUser && successPassword) {
      accessToken = await jwt.sign(payload, process.env.JWT_SECRECT_KEY);
      findUser.accessToken = accessToken;
    }

    /**generate Refresh token */
    const generateRefreshToken = (payload) => {
      return jwt.sign(payload, refreshSecret);
    };
    const refreshToken = generateRefreshToken(payload);

    const otp = Math.floor(100000 + Math.random() * 900000);

    const emailTemplate = await ejs.renderFile("./src/Api/views/email_otp.ejs", {
      otp,
    });

    // send mail service is use by email service
    const mailSent = sendMail(email, emailTemplate, "Verification code");

    if (!mailSent) {
      // If email sending fails, handle the error
      res.status(500).json({
        success: false,
        message: "Failed to send email with OTP",
      });
    }
    //user send otp
    findUser.otp = otp;

    res.status(200).json({
      success: true,
      message: `User Login successfully!`,
      otp:otp,
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

/* ----------------------------- Forgot password mail send ----------------------------- */
const forgotPasswordEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email Id" });

      const otp = Math.floor(100000 + Math.random() * 900000); 
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration

    user.otp = {
      value: otp,
      expiration: expirationTime,
    };

    // Save the OTP in the user document
    user.otp = otp; //otp is user model key name
    await user.save();

    // Render the EJS template
    const emailTemplate = await ejs.renderFile("./src/Api/views/email_otp.ejs", {
      otp,
    });

    // send mail service is use by email service
    const mailSent = sendMail(email, emailTemplate, "Password Reset OTP");

    if (!mailSent) {
      // If email sending fails, handle the error
      res.status(404).json({
        success: false,
        message: "Failed to send email with OTP",
      });
    }
    res.status(200).json({
      success: true,
      message: `Check your email for the OTP: ${otp}`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  signupUser,
  loginUser,
  forgotPasswordEmail,
};
