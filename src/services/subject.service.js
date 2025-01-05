const { CONSTANTS } = require("../config");
const SubjectModel = require("../models/subject.model");

// Create a new subject
exports.createSubject = async (subject) => {
  try {
    return await SubjectModel.create({...subject});
  } catch (error) {
    return {error:error.message};
  }
}
 
// Get all subjects
exports.getSubjects = async () => {
  try {
    return await SubjectModel.find().select("-__v -_id -createdAt -updatedAt -accountId");
  } catch (error) {
    return {error:error.message};
  }
}
// Delete a subject by ID
exports.deleteSubject = async (subjectId, accountId, type) => {
  try {
    const subject = await SubjectModel.findOne({ subjectId});
    if (!subject) {
      return { error: "Subject not found" };
    }else{
      if (subject.accountId !== accountId && type !== CONSTANTS.ACCOUNT_TYPE_OBJ.admin) {
        return { error: "You are not authorized to delete this subject" };
      }
     return await SubjectModel.findOneAndDelete({ subjectId});
    }
  } catch (error) {
    return { error:error.message };
  }
}
// Get subjects created by a specific user
exports.getSubjectsByUser = async (accountId) => {
  try {
    return await SubjectModel.find({ accountId }).select("-__v -_id -createdAt -updatedAt -accountId");;
  } catch (error) {
    return { error:error.message };
  }
}
// update a subject
exports.update = async (subjectId, subject, type) => {
  try {
    const exist = await SubjectModel.findOne({ subjectId});
    if (!exist) {
      return { error: "Subject not found" };
    }else{
      if (exist.accountId !== subject.accountId && type !== CONSTANTS.ACCOUNT_TYPE_OBJ.admin) {
        return { error: "You are not authorized to update this subject" };
      }
     return await SubjectModel.findOneAndUpdate({ subjectId}, {name:subject.name});
    }
  } catch (error) {
    return { error:error.message };
  }
}