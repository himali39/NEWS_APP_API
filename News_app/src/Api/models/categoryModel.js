const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    subCategoryName: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory", //model name subCategory
      },
    ],
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
