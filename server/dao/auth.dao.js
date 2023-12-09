const mongoose = require('mongoose');  

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

async function login(username, password) {
    const user = await User.findOne({ username, password });
  
    if (user) {
      // Return an object with username and userId
      return { username: user.username, userId: user.userId };
    }
  
    // Return null if no user is found
    return null;
  }

async function getAllUsers() {
    return User.find();
}

module.exports = {
    login,
    getAllUsers,
};