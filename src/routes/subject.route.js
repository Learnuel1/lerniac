const { userRequired } = require("../middlewares/auth.middleware");
const { validateRequestData } = require("../shared/data.middleware");
const {Controllers}  = require("../utils");
const subjectRoute = require("express").Router();
const router = require("express").Router();
subjectRoute.post("/create", validateRequestData("ZSubjectSchema"), Controllers.allControllers.subject_controller.createSubject).get("/list", Controllers.allControllers.subject_controller.getAllSubjects).get("/list_by_user", Controllers.allControllers.subject_controller.getUserSubjects).delete("/", Controllers.allControllers.subject_controller.removeSubject).put("/", Controllers.allControllers.subject_controller.subjectUpdate);


router.use("/", userRequired, subjectRoute);
module.exports = {router};