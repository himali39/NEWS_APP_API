const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    date: {
      type: now.Date(),
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;
