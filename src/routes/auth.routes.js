const { validateRequestData, renameZodSchema } = require("../shared/data.middleware");
const { Controllers } = require("../utils");

const authRouter = require("express").Router();

authRouter.post("/login", validateRequestData("ZLoginSchema"), Controllers.authController.login).post("/logout", Controllers.authController.logout).post("/forget_password", Controllers.authController.forgetPassword).post("/register", validateRequestData("ZAccountSchema", Controllers.accountController.register))

module.exports = {
  authRouter,
}