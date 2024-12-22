const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
app.use(express.json());
const { hashpassword } = require("bcryptjs")
const { APIError } = require("../../APIError")
let activeTokens = new Set();

// Example login route
exports.login = async (req, res,next) => {
  const user = { id: 1, username: 'student' }; // user info

  const token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRETE, { expiresIn: '1h' });

  activeTokens.add(token);

  res.json({ token });
}
exports.logout = async (req, res, next) => {
    try {
        const token = req.headers?.cookie?.split("=")[1];
        if (!token) token = req.headers?.authorization?.split(" ")[1];
        // if(!token){
        //     return error.message()
        // }
        if (token) {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRETE, (err, decoded) => {
                if (err) return next(APIError.unauthenticated("please Login"))
                user.id = decoded.id;
                user.email = decoded.email;
            });
            activeTokens.delete(token); 
            res.send('User logged out');
        }
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}
