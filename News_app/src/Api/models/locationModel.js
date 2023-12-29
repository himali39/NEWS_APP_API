const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    location_name: {
      type: String,
      trim: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Location = mongoose.model("location", locationSchema);

module.exports = Location;
