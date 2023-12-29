const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema(
  {
    // category_name: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "category", //model name
    //   },
    // ],
    subCategoryName: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    language: {
      type: String,
      required: [true, "Language is required."],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const subCategory = mongoose.model("subcategory", subCategorySchema);

module.exports = subCategory;
