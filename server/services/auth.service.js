//@ts-check
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const authDao = require('../dao/auth.dao');
const secret = 'kaemrn';
const User = require('../user.model');


const expiration = 60 * 60;

const bcrypt = require('bcryptjs');

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

    if (!result) throw new Error('NO_USERNAME');

    const { userId } = result;

    return new Promise((resolve, reject) => {
        jwt.sign({username, userId}, secret, jwtOptions, (err, jwtToken) => {
            if (err) {
                reject(err);
                return;
            }
            resolve({jwtToken, userId});
        });
    })
}





/** vs code non sa che questo è un middleware
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

module.exports = {login, checkAuthentication, signup};
