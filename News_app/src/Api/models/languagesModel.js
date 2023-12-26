const mongoose = require("mongoose");

const languagesSchema = mongoose.Schema(
  {
    languages: {
      type: String,
      required: [true, "language name is required."],
      trim: true,
    },
    display_name: {
      type: String,
      trim: true,
    },
    code: {
      type: String,
      trim: true,
    },
    json_file: {
      type: String,
      //   required: [true, "language JSON file is required."],
    },
    flag_image: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Languages = mongoose.model("languages", languagesSchema);

module.exports = Languages;
