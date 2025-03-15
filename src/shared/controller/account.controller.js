const { hashSync } = require("bcryptjs");
const logger = require("../../logger");
const { createAccount, userExistByMail, userExistByPhone, getAccountInfo, updateAccount } = require("../../services");
const { META } = require("../../utils/actions");
const { APIError } = require("../../utils/apiError");

exports.register = async (req, res, next) => {
  try {
    let infoExist = await userExistByMail(req.body.email.toLowerCase());

    if(infoExist && infoExist !== null) return next(APIError.badRequest(`${req.body.email} already exist`))
      else if(req.body?.phone){
    infoExist = await userExistByPhone(req.body.phone);
    if(infoExist && infoExist !== null) return next(APIError.badRequest(`${req.body.phone} already exist`))
    }
    const {password} = req.body;
    const hashedPassword = hashSync(password, 10);
    req.body.password = hashedPassword;
    const user = await createAccount(req.body);
    if(!user) return next(APIError.badRequest("Account creation failed, try again"));
    if(user?.error) return next(APIError.badRequest(user.error));
    logger.info("Account created successfully", {service: META.ACCOUNT});
    res.status(201).json({success: true, message: "Registration successful"})
  } catch (error) {
    next(error)
  }
}
exports.userInfo = async (req, res, next) => {
  try {
    const info = await getAccountInfo(req.user);
    if(!info) return next(APIError.notFound("Account not found"));
    if(info?.error) return next(APIError.badRequest(info.error));
    logger.info("Account info retrieved successfully", {service: META.ACCOUNT});
    res.status(200).json({success: true, msg: "Found", data: info})
  } catch (error) {
    next(error)
  }
}
exports.updateInfo = async (req, res, next) => {
  try {
    const info = await updateAccount(req.user, req.body);
    if(!info) return next(APIError.badRequest("Update failed, try again"));
    if(info?.error) return next(APIError.badRequest(info.error));
    logger.info("Account info updated successfully", {service: META.ACCOUNT});
    res.status(200).json({success: true, msg: "Update successful"})
  } catch (error) {
    next(error)
  }
}