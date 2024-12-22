const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
app.use(express.json());
const { APIError } = require("../../APIError")
exports.verifyToken = async (req, res, next) => {
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
        }
        next();
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}
