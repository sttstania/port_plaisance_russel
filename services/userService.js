const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (name, email, password) => {

  // check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already in use");

  // create new user (password hashed automaticzlly in User)
  const user = await User.create({ 
    name, 
    email, 
    passwordHash: password 
  });
  
  return {
    id: user._id,
    name: user.name,
    email: user.email
  };
};


exports.getUsers = () => {
  return User.find().select('-passwordHash').lean();
};

exports.getUserById = (id) => {
  return User.findById(id).select('-passwordHash').lean();
};

exports.deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};