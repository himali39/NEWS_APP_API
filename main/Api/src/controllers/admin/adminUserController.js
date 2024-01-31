const User = require("../../models/userModel");

/* -------------------------------add Personalize data------------------------------ */
const addUser = async (req, res) => {
  try {
    const reqbody = req.body;

    if (req.file) {
      reqbody.ProfileImg = req.file.filename;
    }
    console.log(req.files);

    const userData = await User.create(reqbody);

    if (!userData) {
      return res.status(404).json({ message: "User Data not found" });
    }

    res.status(200).json({
      success: true,
      message: `User Data data add successfully!`,
      data: userData,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
/* ----------------------------- Get USER data ----------------------------- */
const allUserList = async (req, res) => {
  try {
    const userData = await User.find();

    if (!userData) {
      return res.status(404).json({ message: "User list ata not found" });
    }

    const baseUrl =
      req.protocol + "://" + req.get("host") + process.env.BASE_URL_USER_PATH;

    res.status(200).json({
      success: true,
      message: "user data get successfully ",
      user: userData,
      baseUrl: baseUrl,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------------------- delete of User --------------------------- */
const deleteUser = async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);

    if (!userData) {
      return res.status(404).json({ message: "User Data not found" });
    }
    const DeletedData = await User.findByIdAndDelete(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "List of User Data successfully ",
      user: DeletedData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* ----------------------------- update Languages  data ----------------------------- */
const updateUser = async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);

    if (!userData) {
      return res.status(404).json({ message: "user data not found" });
    }
    if (req.file && req.file != "undefined") {
      req.body.ProfileImg = req.file.filename;
    }

    const updatedData = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedData) {
      throw new Error("Something went wrong, try again later");
    }

    res.status(200).json({
      success: true,
      message: "User data update successfully",
      user: updatedData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* ----  total count of active and inactive users ---- */
const getStatusWiseUserCount = async (req, res) => {
  try {
    const users = await User.find();

    const activeUsers = users.filter((user) => user.status);
    const inactiveUsers = users.filter((user) => !user.status);

    const activeCount = activeUsers.length;
    const inactiveCount = inactiveUsers.length;

    // const activeCount = users.filter((user) => user.status).length;
    // const inactiveCount = users.length - activeCount;

    // const userData = { activeCount: activeCount, inactiveCount: inactiveCount };
    const userData = { activeCount, inactiveCount, activeUsers, inactiveUsers };

    res.status(200).json({
      success: true,
      message: "Active User data get successfully",
      user: userData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  allUserList,
  addUser,
  deleteUser,
  updateUser,
  getStatusWiseUserCount,
};
