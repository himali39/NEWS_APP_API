const router = require("express").Router();
const languageRouter = require("../admin/adminLanguageRouter");
const categoryRouter = require("../admin/adminCategoryRouter");
const newsRouter = require("../admin/adminNewsRouter");
const tagRouter = require("../admin/tagRouter");
const subcategoryRouter = require("../admin/adminSubcategoryRouter");
const locationRouter = require("../admin/adminLocationRoute");
const faqsRouter = require("../admin/adminFaqsRouter");
const feedbackRouter = require("../admin/adminFeedbackRouter");
const notifiRouter = require("../admin/adminNotificationRouter");
const adminRouter = require("../admin/adminRouter");
const userRouter = require("../admin/userRouter");

/* ---------------------------- admin Routers ---------------------------- */
router.use("/admin", adminRouter);

/* ---------------------------- admin Routers ---------------------------- */
router.use("/admin", userRouter);

/* ---------------------------- Language Routers ---------------------------- */
router.use("/admin/language", languageRouter);

/* ---------------------------- Category Routers ---------------------------- */
router.use("/admin/category", categoryRouter);

/* ---------------------------- sub Category Routers ---------------------------- */
router.use("/admin/subcategory", subcategoryRouter);

/* ---------------------------- News Routers ---------------------------- */
router.use("/admin/news", newsRouter);

/* ---------------------------- Tag Routers ---------------------------- */
router.use("/admin/tag", tagRouter);

/* ---------------------------- Location Routers ---------------------------- */
router.use("/admin/location", locationRouter);

/* ---------------------------- FAQS Routers ---------------------------- */
router.use("/admin/faqs", faqsRouter);

/* ---------------------------- Feedback Routers ---------------------------- */
router.use("/admin/feedback", feedbackRouter);

/* ---------------------------- Notification Routers ---------------------------- */
router.use("/admin/notification", notifiRouter);

module.exports = router;
