const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email Id is required."],
      trim: true,
    },

    mobile: {
      type: String,
      required: [true, "Mobile no is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    accessToken: {
      type: String,
    },
    otp: {
      type: String,
      maxlength: [6, "OTP should be maximum six characters."],
      default: "",
    },
    expiration: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/*password bcrypt */
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
