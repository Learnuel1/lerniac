
const { router } = require("express");
const { logout, verifyToken } = require("../controllers");
router()
router.post("auth/logout",verifyToken,logout)

const Routers = require("express").Router();

const AuthRoutes = require("./auth.routes");

Routers.use("/auth", AuthRoutes.authRouter)

module.exports= {
  Routers,
}
