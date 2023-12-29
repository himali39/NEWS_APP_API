const router = require("express").Router();
const userRouter = require("../app/userRouter");
const categoryRouter = require("./appCategoryRouter");
const subCategoryRouter = require("./appSubCategoryRouter");
const newsRouter = require("./appNewsRouter");
const languageRouter = require("../app/appLanguageRouter");

// Use router in index
router.use("/app/user", userRouter);

router.use("/app/category", categoryRouter);

router.use("/app/subCategory", subCategoryRouter);

router.use("/app/news", newsRouter);

router.use("/app/language", languageRouter);



module.exports = router;