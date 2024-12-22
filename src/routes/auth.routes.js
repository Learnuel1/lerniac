const { validateRequestData } = require("../shared/data.middleware");
const { Controllers } = require("../utils");

const authRouter = require("express").Router();

authRouter.post("/login", validateRequestData("ZLoginSchema"), Controllers.authController.login)

module.exports = {
  authRouter,
}