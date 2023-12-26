const router = require("express").Router();
const userRouter = require("../app/userRouter");
const personalizeRouter = require("../app/personalizeRouter");
const newsRouter = require("../app/newsRouter");

// Use router in index
router.use("/app/user", userRouter);

router.use("/app/personalize", personalizeRouter);

router.use("/app/news", newsRouter);



module.exports = router;