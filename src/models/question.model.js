const { Schema, model } = require("mongoose");
const { CONSTANTS } = require("../config"); 
  
const QuestionSchema = new Schema({
  questionId: {
    type: String,
    required: [true, "Question ID is required"],
    index: true,
    unique: true,
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
    index: true,
  },
  type: {
    type: String,
    enum: CONSTANTS.QUESTION_TYPE,
    index: true,
  },
  exam: {
    type: String,
    enum: CONSTANTS.EXAM_TYPE,
    index: true,
    required: [true, "Exam is required"],
  },
  option: [
    {
      A: {
        type: String,
        required: [true, "Option A is required"],
        trim: true,
      },
      B: {
        type: String,
        required: [true, "Option B is required"],
        trim: true,
      },
      C: {
        type: String,
        required: [true, "Option C is required"],
        trim: true,
      },
      D: {
        type: String,
        required: [true, "Option D is required"],
        trim: true,
      },
    },
  ],
  answer: {
    type: String,
    required: [true, "Answer is required"],
    trim: true,
  },
  instruction: {
    type: String,
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "Account ID is required"],
    index: true,
  },
  question: {
    type: String,
    required: [true, "Question is required"],
    trim: true,
  },
  image: [
    {
      id: {
        type: String,
        required: [true, "Image ID is required"],
      },
      url: {
        type: String,
        required: [true, "Image URL is required"],
      },
    },
  ],
  questionNumber: {
    type: Number,
    required: [true, "Question number is required"],
    index: true,
  },
  status: {
    type: String,
    enum: CONSTANTS.QUESTION_STATUS,
    required: [true, "Question Status is required"],
  },
  subjectId: {
    type: String,
    required: [true, "Subject ID is required"],
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: [true, "Subject is required"],
  },
},
{ timestamps: true }
);

const QuestionModel = model("Question", QuestionSchema);
module.exports = QuestionModel;