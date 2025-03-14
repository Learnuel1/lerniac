const QuestionModel = require("../models/question.model")

exports.create = async (question) => {
  try {
    // get the last questionNumber
    const lastQuestion = await QuestionModel.findOne({}).sort({questionNumber: -1})
    if (lastQuestion) {
      question.questionNumber = lastQuestion.questionNumber + 1
    }else{
      question.questionNumber = 1;
    }
      return await QuestionModel.create({...question})
  } catch (error) {
    return {error}
  }
}