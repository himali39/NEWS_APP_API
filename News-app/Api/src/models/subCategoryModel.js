const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema(
  {
    subCategoryName: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },

    languages: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "languages",
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const subCategory = mongoose.model("subcategory", subCategorySchema);

module.exports = subCategory;
