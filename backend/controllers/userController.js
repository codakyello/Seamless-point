const User = require("../models/User");
const { catchAsync } = require("../utils/helpers");

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new user
const createUser = catchAsync(async (req, res) => {
  console.log("create user");
  const {
    name,
    email,
    password,
    phone,
    // dob,
    firstName,
    lastName,
    // gender,
    confirmPassword,
  } = req.body;
  // const hashedPassword = bcrypt

  const user = new User({
    name,
    email,
    password,
    dob,
    firstName,
    lastName,
    gender,
    // confirmPassword,
    phone,
  });
  await user.save();
  res.status(201).json(user);
});

module.exports = { getUsers, createUser };
