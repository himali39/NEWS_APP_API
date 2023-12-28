const router = require("express").Router();
const languageRouter = require("../admin/adminLanguageRouter");
const categoryRouter = require("../admin/adminCategoryRouter");
const newsRouter = require("../admin/newsRouter");
const tagRouter = require("../admin/tagRouter");
const subcategoryRouter = require("../admin/adminSubcategoryRouter");


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


module.exports = router;
