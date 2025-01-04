const logger = require('../logger');
const { createSubject } = require('../services/index');
const { META } = require('../utils/actions');
const { APIError } = require('../utils/apiError');
 
exports.createSubject = async (req, res, next) => {
  try { 
    const newSubject = await createSubject(req.body);
    if (!newSubject) return next(APIError.badRequest("Subject creation failed, try again"));
    if (newSubject.error) return next(APIError.badRequest(newSubject.error));
    logger.info("Subject created successfully", { service: META.SUBJECT });
    res.status(201).json({success: true, message: "Subject created successfully"});
  } catch (error) {
    next(error)
  }
};
 