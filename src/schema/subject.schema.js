const { z } = require('zod');
const { ObjectId } = require('mongodb');
const { shortIdGen } = require('../utils/generator');

exports.ZSubjectSchema = z.object({ 
  subjectId: z.string({
    description: "Subject ID",
    required_error: "Subject ID is required",
    invalid_type_error: "Invalid Subject ID"
  })
  .min(2)
  .max(50),
  name: z.string({
    description: "Subject Name",
    required_error: "Subject Name is required",
    invalid_type_error: "Invalid Subject Name"
  })
  .min(2)
  .trim()
  .max(50),
  accountId: z.instanceof(ObjectId, {
    description: "Account ID",
    required_error: "Account ID is required",
    invalid_type_error: "Invalid Account ID"
  }),

});
