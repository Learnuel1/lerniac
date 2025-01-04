const { userRequired } = require("../middlewares/auth.middleware");
const { validateRequestData } = require("../shared/data.middleware");
const {Controllers}  = require("../utils");
const subjectRoute = require("express").Router();
const router = require("express").Router();
subjectRoute.post("/create", validateRequestData("ZSubjectSchema"), Controllers.allControllers.subject_controller.createSubject)


router.use("/", userRequired, subjectRoute);
module.exports = {router};