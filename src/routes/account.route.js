const { userRequired } = require("../middlewares/auth.middleware");
const { validateRequestData } = require("../shared/data.middleware");
const { Controllers } = require("../utils");

const userRoutes = require("express").Router();
const routes = require("express").Router();
routes.put("/", validateRequestData("ZUpdateAccountSchema"), Controllers.accountController.updateInfo).get("/", Controllers.accountController.userInfo);
userRoutes.use("/", userRequired, routes);
module.exports = {
    userRoutes,
    };