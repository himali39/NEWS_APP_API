const { sendMail } = require("../../helper/emailsend");
const Faqs = require("../../models/faqsModel");
const Feedback = require("../../models/feedbackModel");
const ejs = require("ejs");
const User = require("../../models/userModel");
const dotenv = require("dotenv").config();
/* ---------------------------- Get All FAQs question --------------------------- */
const getAllFaqs = async (req, res, next) => {
  try {
    const faqs = await Faqs.find();

    if (!faqs) {
      return res.status(404).json({ message: "Faqs not found" });
    }

    res.status(200).json({
      success: true,
      message: "FAQS get successfully ",
      result: faqs,
    });
  } catch (err) {
    next(err);
  }
};

/* ---------------------------- add feedback  --------------------------- */
const addFeedback = async (req, res, next) => {
  try {
    // const reqbody = req.body;
    const user = await User.findById(req.body.userId);

    const newsFeedback = await Feedback.create({
      userId: req.body.userId,
      feedback: req.body.feedback,
    });

    const result = await newsFeedback.save();

    // // Render the EJS template
    const emailTemplate = await ejs.renderFile("./src/Api/views/feedback.ejs");
        
    sendMail({
      from: user.email,
      to: process.env.EMAIL_FROM,
      sub: "News application",
      htmlFile: emailTemplate,
      extraData: {
        username: user.name,
        useremail: user.email,
        usermo: user.mobile,
        feedback: req.body.feedback,
      },
    });

    // send mail service is use by email service
    // const mailSent = sendMail(reqbody.userId, emailTemplate, "thank you");

    // if (!mailSent) {
    //   // If email sending fails, handle the error
    //   res.status(404).json({
    //     success: false,
    //     message: "Failed to send email with OTP",
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "Your request has been send successfully. We will respond you as soon as possible.",
      result: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllFaqs,
  addFeedback,
};

