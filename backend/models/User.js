const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a firstName"],
  },
  lastName: { type: String, required: [true, "Please provide a lastName"] },
  dob: {
    type: Date,
    // required: [true, "Please provide a DOB"],
  },
  gender: {
    type: String,
    enum: {
      values: ["M", "F"],
      message: "Gender is either: Male or Female",
    },
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE (not on UPDATE)
      validator: function (el) {
        return el === this.password; // Check if confirmPassword matches password
      },
      message: "Passwords do not match!",
    },
  },
  // notifications: {
  //   type: String,
  // },
  // balance: { type: Number },
  // { timestamps: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
