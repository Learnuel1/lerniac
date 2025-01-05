const logger = require('../logger');
const { createSubject, getSubjects, getSubjectsByUser, deleteSubject, updateSubject } = require('../services/index');
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
exports.getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await getSubjects();
    if(subjects.error) return next(APIError.badRequest(subjects.error));
    logger.info("Subjects retrieved successfully", { service: META.SUBJECT });
    res.status(200).json({success: true, message: "Found", subjects});
  } catch (error) {
    next(error)
  }
}
exports.getUserSubjects = async (req, res, next) => {
  try {
    const subjects = await getSubjectsByUser(req.user);
    if(subjects.error) return next(APIError.badRequest(subjects.error));
    logger.info("Subjects retrieved successfully", { service: META.SUBJECT });
    res.status(200).json({success: true, message: "Found", subjects});
  } catch (error) {
    next(error)
  }
}
exports.removeSubject = async (req, res, next) => {
  try {
    const { subjectId } = req.query;
    if(!subjectId) return next(APIError.badRequest("Subject ID is required"));
    const deletedSubject = await deleteSubject(subjectId, req.user, req.userType);
    if(!deletedSubject) return next(APIError.badRequest("Subject deletion failed, try again"));
    if (deletedSubject.error) return next(APIError.badRequest(deletedSubject.error));
    logger.info("Subject deleted successfully", { service: META.SUBJECT });
    res.status(200).json({success: true, message: "Subject deleted successfully"});
  } catch (error) {
    next(error)
  }
}
exports.subjectUpdate = async (req, res, next) => {
  try {
    const { subjectId } = req.body;
    delete req.body.subjectId;
     const info = {
      name: req.body.name,
      accountId:  req.user,
     }
    if(!subjectId) return next(APIError.badRequest("Subject ID is required"));
    const updateSub = await updateSubject(subjectId, info, req.userType);
    if(!updateSub) return next(APIError.badRequest("Subject update failed, try again"));
    if (updateSub.error) return next(APIError.badRequest(updateSub.error));
    logger.info("Subject updated successfully", { service: META.SUBJECT });
    res.status(200).json({success: true, message: "Subject updated successfully"});
  } catch (error) {
    next(error)
  }
}