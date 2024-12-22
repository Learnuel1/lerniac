const { router } = require("express");
const { logout, verifyToken } = require("../controllers");
router()
router.post("auth/logout",verifyToken,logout)