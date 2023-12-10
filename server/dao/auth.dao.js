const mongoose = require('mongoose');  
const bcrypt = require('bcryptjs');
const User = require('../user.model');

const signup = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  return { username: newUser.username, userId: newUser._id };
};

async function login(username, password) {
  const user = await User.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
      // User found and password is correct
      return { username: user.username, userId: user._id };
  }

  // User not found or password incorrect
  return null;
}


async function getAllUsers() {
    return User.find();
}

module.exports = {
    login,
    getAllUsers,
    signup
};


