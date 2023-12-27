const mongoose = require("mongoose");

const abcSchema = mongoose.Schema(
  {
    flag_image: String,
    json_file: String,
  },
  {
    timestamps: true,
    // versionKey: false,
  }
);

const abc = mongoose.model("abc", abcSchema);

module.exports = abc;
