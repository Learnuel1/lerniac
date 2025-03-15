
const router  = require("express").Router();
const Routers = require("express").Router();
const { logout } = require("../shared/controller/auth.controller");
router.post("auth/logout", logout)
const AuthRoutes = require("./auth.routes");
const SubjectRoutes = require("./subject.route");
const {userRoutes} = require("./account.route");
Routers.use("/auth", AuthRoutes.authRouter);
Routers.use("/subject", SubjectRoutes.router);
Routers.use("/account", userRoutes);
module.exports= {
  Routers,
}
