const router = require("express").Router();
const languageRouter = require("../admin/languageRouter");
const personalizeRouter = require("../admin/personalizeRouter");
const newsRouter = require("../admin/newsRouter");


// Use router in index
router.use("/admin/language", languageRouter);

router.use("/admin/personalize", personalizeRouter);

router.use("/admin/news", newsRouter);

module.exports = router;
