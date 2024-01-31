const Tag = require("../../models/tagModel");


/* -------------------------------add tag data------------------------------ */
const addTag = async (req, res) => {
  try {
    const reqbody = req.body;

    /** create personalize using model */
    const tag = await Tag.create(reqbody);

    if (!tag) {
      return res.status(404).json({ message: "Tag data not found" });
    }
    res.status(200).json({
      success: true,
      message: `Tag data add successfully!`,
      data: tag,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getTagData = async (req, res) => {
  try {
    const tag = await Tag.find().populate({
      path: "languages",
      select: ["languagesName"],
    });

    if (!tag) {
      return res.status(404).json({ message: "Tag data not found" });
    }
    res.status(200).json({
      success: true,
      message: `Tag data get successfully!`,
      tag: tag,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* ----------------------------- delete Category data ----------------------------- */
const deleteTag = async (req, res) => {
  try {
    const tagData = await Tag.findById(req.params.id);

    if (!tagData) {
      return res.status(404).json({ message: "Tag  data not found" });
    }

    const deleteData = await Tag.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Tag data deleted successfully",
      tag: deleteData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* ----------------------------- update Tag data ----------------------------- */
const updateTag = async (req, res) => {
  try {
    const id = req.params.id;
    const TagData = await Tag.findById(id);

    if (!TagData) {
      return res.status(404).json({ message: "Tag data not found" });
    }
    const updatedData = await Tag.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedData) {
      throw new Error("Something went wrong, try again later");
    }

    res.status(200).json({
      success: true,
      message: "Tag data deleted successfully",
      tag: updatedData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* --------------------------- Update Sub category Status --------------------------- */
const updateTagStatus = async (req, res, next) => {
  try {
   
    const tagData = await Tag.findById(req.params.id);

    if (!tagData) {
      return res.status(404).json({ message: "Tag data not found" });
    }
    tagData.status = !tagData.status;

    const updatedStatus = await tagData.save();

    res.status(200).json({
      success: true,
      message: "Tag update status successfully",
      news: updatedStatus,
    });

  } catch (err) {
    next(err);
  }
};

module.exports = { addTag, getTagData, updateTag, deleteTag, updateTagStatus };
