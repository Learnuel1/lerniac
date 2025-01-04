const authController = require("../shared/controller/auth.controller")
const accountController = require("../shared/controller/account.controller") 
const allControllers = require("../controllers")
module.exports = {
  Controllers: {
    authController,
    accountController,
    allControllers,
  }, 
}