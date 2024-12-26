const { validateRequestData } = require("../shared/data.middleware");
const { Controllers } = require("../utils");

const authRouter = require("express").Router();

authRouter.post("/login", validateRequestData("ZLoginSchema"), Controllers.authController.login).post("/logout", Controllers.authController.logout).post("/forget_password", Controllers.authController.resetPassword)

module.exports = {
  authRouter,
}