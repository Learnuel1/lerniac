const config = require("../config/env");
const { userExistById } = require("../services");
const { APIError } = require("../utils/apiError");
const jwt = require("jsonwebtoken");
const {ObjectId} = require("mongodb");
const userRequired = async (req, res, next) => {
  try {
    let token = req.cookies?.leRn_iac;
    if (!token) token = req.headers?.authorization?.split(" ")[1];
    if (!token) token = req.headers?.cookie?.split("=")[1];
    if (!token) return next(APIError.unauthenticated());
    const payload = jwt.verify(token, config.TOKEN_SECRETE);
    const isUser = await userExistById(new ObjectId(payload.id));
    if (!isUser) return next(APIError.notFound(`user does not exist`));
    if (isUser?.error) return next(APIError.badRequest(isUser?.error));
    req.user = new ObjectId(payload.id);
    req.userId = payload.userId; 
    req.userType = payload.type;
    req.firstName = isUser.firstName;
    req.email = isUser.email;
    req.token = token
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      next(APIError.unauthenticated("JWT token has expired"));
    } else next(error);
    
  }
}; 

module.exports = { userRequired };