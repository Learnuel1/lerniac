const Routers = require("express").Router();

const AuthRoutes = require("./auth.routes");



Routers.use("/auth", AuthRoutes.authRouter)


module.exports= {
  Routers,
}