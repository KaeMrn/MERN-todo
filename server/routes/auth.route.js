//@ts-check
const router = require('express').Router();
const authService = require('../services/auth.service');
const expiration = 60 * 60;


const cookieName = 'jwt';

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await authService.signup(username, password);

        
        res.json({ userId: result.userId, message: 'Signup successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/login', async (req, res) => {

    try {
        const { jwtToken, userId } = await authService.login(req.body.username, req.body.password);
        res.cookie(cookieName, jwtToken, {
            path: '/', // the whole website
            httpOnly: true, // it prevents the cookie to be accessed by JavaScript, it makes it safer
            // secure: true, // it requires a certificate. It's disabled because we are running it on localhost
            sameSite: true, // it prevents cross origin attacks
            maxAge: expiration * 1000 // same time of jwt but in milliseconds (thus *1000)
        });

        // this is an unsfe cookie to handle logged / not logged
        res.cookie('userId', userId, {
            maxAge: expiration * 1000 //same time of jwt, but this is visibile by javascript (it doesn't contain any sensitive information)
        });

        res.json({ userId });
        res.end();
    } catch (error) {
        console.error(error);
        switch (error.message) {
            case 'LOGIN_FAILED':
                res.status(401);
                break;
            case 'NO_USERNAME':
                res.status(401);
                break;
            default:
                res.status(500);
                break;
        }
        res.end();
    }
});




router.post('/logout', (req, res) => {
    res
        .clearCookie(cookieName)
        .end();
});
/** for vscode
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
const checkAuthentication = async (req, res, next) => {

    const cookie = req.cookies[cookieName];

    try {
        const payload = await authService.checkAuthentication(cookie);

        //@ts-ignore
        req.user = payload;
        next();
    } catch (error) {
        console.error(error);

        next(error);
    }
}

module.exports = {router, checkAuthentication};
