const logger = require("../logger");
const { uploadQuestion } = require("../services");
const { META } = require("../utils/actions");
const { APIError } = require("../utils/apiError");

exports.createQuestion = async (req, res, next) => {
  try {
    const save = uploadQuestion(req.body);
    if(!save) return next(APIError.badRequest("Question upload failed"));
    if(save?.error) return next(APIError.badRequest(save.error));
    logger.info("Question uploaded successfully", {service: META.QUESTION});
  } catch (error) {
    next(error)
  }
}