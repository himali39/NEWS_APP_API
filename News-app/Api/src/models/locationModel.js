const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    locationName: {
      type: String,
      trim: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
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
const Location = mongoose.model("location", locationSchema);

module.exports = Location;
