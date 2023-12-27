const router = require("express").Router();
const languageRouter = require("../admin/languageRouter");
const personalizeRouter = require("../admin/personalizeRouter");
const newsRouter = require("../admin/newsRouter");
const tagRouter = require("../admin/tagRouter");
const demo = require("../admin/demo");

// Use router in index
router.use("/admin/language", languageRouter);

router.use("/admin/personalize", personalizeRouter);

router.use("/admin/news", newsRouter);

router.use("/admin/demo", demo);

router.use("/admin/tag", tagRouter);


module.exports = router;
