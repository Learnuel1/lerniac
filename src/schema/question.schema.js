const { z } = require('zod');
const { ObjectId } = require('mongodb');
const { CONSTANTS } = require('../config');

exports.ZQuestionSchema = z.object({ 
    questionId: z.string().nonempty("questionId cannot be empty"),
    year: z.number().int().positive("Year must be a positive integer"),
    type: z.enum(CONSTANTS.QUESTION_TYPE),
    exam: z.enum(CONSTANTS.EXAM_TYPE),
    option: z.array(z.object({
        A: z.string({
            description: "Option A",
            required_error: "Option A is required",
        }).nonempty("Option A cannot be empty").trim(),
        B: z.string({
            description: "Option B",
            required_error: "Option B is required",
        }).nonempty("Option B cannot be empty").trim(),
        C: z.string({
            description: "Option C",
            required_error: "Option C is required",
        }).nonempty("Option C cannot be empty").trim(),
        D: z.string({
            description: "Option D",
            required_error: "Option D is required",
        }).nonempty("Option D cannot be empty").trim()
    })).nonempty("Options cannot be empty").max(1, {message: "Only one set of option is allowed"}),
    answer: z.string({
        description: "Question Answer",
        required_error: "Answer is required",
        invalid_type_error: "Invalid Answer"
    }).nonempty("Answer cannot be empty").trim(),
    instruction: z.string().trim().optional(),
    account: z.instanceof(ObjectId).refine(val => val instanceof ObjectId, {
        message: "Invalid user ID"
    }),
    question: z.string({
        description: "Question",
        required_error: "Question is required",
    }).nonempty("Question cannot be empty").trim(),
    image: z.array(z.object({
        id: z.string().nonempty("Image ID cannot be empty"),
        url: z.string().nonempty("Image URL cannot be empty"),
    })).max(1, {message: "Only one image is allowed"}).optional(),
    status: z.enum(CONSTANTS.QUESTION_STATUS).default(CONSTANTS.QUESTION_STATUS_OBJ.private),
    subjectId: z.string({
        description: "Subject ID ",
        required_error: "Subject ID is required",
    }).nonempty("Subject ID cannot be empty").trim(),
    subject: z.instanceof(ObjectId).refine(val => val instanceof ObjectId, {
        message: "Invalid ObjectId"
    })
}); 