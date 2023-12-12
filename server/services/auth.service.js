//@ts-check
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const authDao = require('../dao/auth.dao');
const secret = 'kaemrn';
const User = require('../user.model');


const expiration = 60 * 60; //Token expiration time in seconds

const bcrypt = require('bcryptjs'); // bcrypt library for hashing passwords

// TODO: I move this to dao

//Signs up a new user by hashing their password and saving the user in the database.

async function signup(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10); // the '10' is the salt rounds
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    return { username: newUser.username, userId: newUser._id };
}


const jwtOptions = {
    expiresIn: expiration // it lasts 1h
}


async function login(username, password) {
    const result = await authDao.login(username, password);
    // Authenticating the user

    if (!result) throw new Error('NO_USERNAME');

    const { userId } = result;

    return new Promise((resolve, reject) => {
        jwt.sign({username, userId}, secret, jwtOptions, (err, jwtToken) => {
            if (err) {
                reject(err); // Rejecting the promise if there's an error in token generation
                return;
            }
            resolve({jwtToken, userId});
        });
    })
}





/*** Middleware to check user authentication via JWT.

 * 
 * @param {string} cookie
 */
const checkAuthentication = (cookie) => {
    return new Promise((resolve, reject) => {
        jwt.verify(cookie, secret, (err, payload) => {
            if (err) {
                console.error(err);    
                return reject('NOT_AUTHORIZED'); // TODO: to constant
            }
            resolve(payload);
          });
    })
}
// Exporting the functions for use in other modules

module.exports = {login, checkAuthentication, signup};
