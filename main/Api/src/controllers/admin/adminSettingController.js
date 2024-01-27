const Faqs = require("../../models/faqsModel");
const Feedback = require("../../models/feedbackModel");

/* ---------------------------- Add FAQs question --------------------------- */
const addFaqs = async (req, res, next) => {
  try {
    const { question, answer } = req.body;

    const newFaqs = await Faqs.create({
      question,
      answer,
    });

    const result = await newFaqs.save();

    res.status(200).json({
      success: true,
      message: "FAQS set successfully ",
      result: result,
    });
  } catch (err) {
    next(err);
  }
};
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
      faqs: faqs,
    });
  } catch (err) {
    next(err);
  }
};

/* ------------------------------- delete FAQs ------------------------------ */
const deleteFaqs = async (req, res, next) => {
  try {
    const faqs = await Faqs.findById(req.params.id);

    if (!faqs) {
      return res.status(404).json({ message: "Faqs not found" });
    }

    const deleteData = await Faqs.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "FAQS delete successfully ",
      faqs: deleteData,
    });
  } catch (err) {
    next(err);
  }
};
/* ------------------------------- Update FAQs ------------------------------ */
const updateFaqs = async (req, res, next) => {
  try {
    const { question, answer } = req.body;
    const faqs = await Faqs.findById(req.params.id);

    if (!faqs) {
      return res.status(404).json({ message: "Faqs not found" });
    }

    faqs.question = question;
    faqs.answer = answer;

    const result = await faqs.save();

    res.status(200).json({
      success: true,
      message: "FAQS get successfully ",
      result: result,
    });
  } catch (err) {
    next(err);
  }
};

/* ---------------------------- list of Feedback ---------------------------- */
const getAllFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find().populate("userId");

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({
      success: true,
      message: "Feedback get successfully ",
      feedback: feedback,
    });
  } catch (err) {
    next(err);
  }
};

/* ------------------------------- delete feedback ------------------------------ */
const deleteFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    const deleteData = await Feedback.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Feedback delete successfully ",
      feedback: deleteData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addFaqs,
  getAllFaqs,
  updateFaqs,
  deleteFaqs,
  getAllFeedback,
  deleteFeedback,
};
