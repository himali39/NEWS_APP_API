
const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tag name is required."],
      trim: true,
    },
    language: {
      type: String,
    }, 
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Tag = mongoose.model("tag", tagSchema);

module.exports = Tag;
