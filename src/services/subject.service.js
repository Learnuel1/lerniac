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
    return await SubjectModel.find();
  } catch (error) {
    return {error:error.message};
  }
}
// Delete a subject by ID
exports.deleteSubject = async (subjectId, accountId) => {
  try {
    const subject = await SubjectModel.findOneAndDelete({ subjectId, accountId});
    if (!subject) {
      return { error: "Subject not found or user not authorized" };
    }
    return { message: "Subject deleted successfully" };
  } catch (error) {
    return { error:error.message };
  }
}
// Get subjects created by a specific user
exports.getSubjectsByUser = async (accountId) => {
  try {
    return await SubjectModel.find({ accountId });
  } catch (error) {
    return { error:error.message };
  }
}