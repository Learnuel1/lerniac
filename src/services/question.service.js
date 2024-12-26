const QuestionModel = require("../models/question.model")

exports.create = async (question) => {
  try {
      return await QuestionModel.create({...question})
  } catch (error) {
    return {error}
  }
}