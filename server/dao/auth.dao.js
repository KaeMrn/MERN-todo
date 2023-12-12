// Importing necessary modules

const mongoose = require('mongoose');  
const bcrypt = require('bcryptjs');
const User = require('../user.model');

// Async function to handle user signup.

const signup = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();// Saving the new user to the database
  return { username: newUser.username, userId: newUser._id };
};

// Async function to handle user login.

async function login(username, password) {
  const user = await User.findOne({ username });// Searching for a user by username

    // Checking if user exists and if the password is correct

  if (user && await bcrypt.compare(password, user.password)) {
      // User found and password is correct
      return { username: user.username, userId: user._id };
  }

  // User not found or password incorrect
  return null;
}

// Async function to retrieve all users from the database.

async function getAllUsers() {
    return User.find();
}
// Exporting the functions to be used in other parts of the application.

module.exports = {
    login,
    getAllUsers,
    signup
};


