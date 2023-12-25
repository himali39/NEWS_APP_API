const router = require("express").Router();
const userRouter = require("../app/userRouter");
const personalizeRouter = require("../app/personalizeRouter");

// Use router in index
router.use("/app/user", userRouter);

router.use("/app/personalize", personalizeRouter);


module.exports = router;