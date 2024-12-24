const { Schema, model } = require("mongoose");
const { CONSTANTS } = require("../config");

const QuestionSchema = new Schema({
  questionId: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  year: {
    type: Number,
    required: true,
    index:true
  },
  type: {
    type: String,
    enum: CONSTANTS.QUESTION_TYPE,
  }
},
{timestamps:true}
);

const QuestionModel = model("Question", QuestionSchema);
module.exports = QuestionModel;