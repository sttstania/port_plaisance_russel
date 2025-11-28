const User = require("../models/User");

// Create a new user
exports.addUser = async (data) => {
  const newUser = new User(data);
  return await newUser.save();
};

// Fetch all users without password hashes
exports.fetchAllUsers = async () => {
  return await User.find({}, "-passwordHash").lean();
};
