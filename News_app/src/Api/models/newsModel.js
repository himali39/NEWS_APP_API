const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    languages: {
      type: String,
      required: [true, "language name is required."],
      trim: true,
    },
    personalize: {
      type: String,
    },
    expiry_date: {
      type: Date,
      default: Date(),
      required: [true, "Expiry Date name is required."],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "News Title name is required."],
    },
    tag_name: {
      type: mongoose.Types.ObjectId,
      ref: "tag", //modle name
    },
    location: {
      type: String,
      trim: true,
    },
    news_image: {
      type: String,
      trim: true,
      required: [true, "News image name is required."],
    },
    content_type: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const News = mongoose.model("news", newsSchema);

module.exports = News;
