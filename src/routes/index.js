
const router  = require("express").Router();
const Routers = require("express").Router();
const { logout } = require("../shared/controller/auth.controller");
router.post("auth/logout", logout)


const AuthRoutes = require("./auth.routes");

Routers.use("/auth", AuthRoutes.authRouter)

module.exports= {
  Routers,
}
