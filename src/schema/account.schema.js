const { z } = require("zod");
const { CONSTANTS } = require("../config");

exports.ZLoginSchema = z.object({
password: z.string({
  description: "Account Password",
  required_error: "Password is required",
})
.minLength(8),
email: z.string({
  description: "Account Email",
  required_error: "Email is required",
  invalid_type_error: "Invalid email format"
})
.email()
.minLength(5)
})

exports.ZAccountSchema = z.object({
  accountId: z.string({
    description: "Account ID",
    required_error: "Account ID is required",
    invalid_type_error: "Invalid Account ID"
  })
  .minLength(8),
firstName: z.string({
  description: "First name",
  required_error: "First name is required",
  invalid_type_error: "First name is not in a valid format"
})
.minLength(3)
.isNaN(),
lastName: z.string({
  description: "Last name",
  required_error: "Last name is required",
  invalid_type_error: "Last name is not in a valid format"
})
.minLength(3)
.isNaN(),
otherName: z.string({
  description: "Last name",
  required_error: "Last name is required",
  invalid_type_error: "Last name is not in a valid format"
})
.minLength(3)
.isNaN()
.optional(),
profile: z.object({
  id: z.string({
    description: "Image ID",
    required_error: "Image ID is required",
    invalid_type_error: "Image ID url is invalid",
  })
  .isURL(),
  url: z.string({
    description: "Image URL",
    required_error: "Image URL is required",
    invalid_type_error: "Image url is invalid",
  })
  .isURL(),
})
.optional(),
email: z.string({
  description: "Account email",
  required_error: "Account email is required",
  invalid_type_error: "Email is invalid"
})
.isEmail(),
phone: z.string({
  description: "Account phone number",
  required_error: "Account phone number is required",
  invalid_type_error: "phone number is invalid"
})
.minLength(11)
.maxLength(15),
plan: z.string({
  description: "Account Plan",
  required_error: "Account plan is required",
  invalid_type_error: "plan is invalid"
})
.default("student")
.isOptional(),
type: z.enum(CONSTANTS.ACCOUNT_TYPE)
.default(CONSTANTS.ACCOUNT_TYPE_OBJ.student)
})