const { hashSync } = require("bcryptjs");
const logger = require("../../logger");
const { createAccount, userExistByMail, userExistByPhone } = require("../../services");
const { META } = require("../../utils/actions");
const { APIError } = require("../../utils/apiError");

exports.register = async (req, res, next) => {
  try {
    let infoExist = await userExistByMail(req.body.email);
    if(infoExist) return next(APIError.badRequest(`${req.body.email} already exist`));
    infoExist = await userExistByPhone(req.body.phone);
    if(infoExist) return next(APIError.badRequest(`${req.body.phone} already exist`))
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