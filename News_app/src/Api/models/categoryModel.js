const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    language: {
      type: String,
      required: [true, "Language is required."],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
