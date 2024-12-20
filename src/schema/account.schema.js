const { z } = require("zod");
const { CONSTANTS } = require("../config");

exports.ZLoginSchema = z.object({
password: z.string({
  description: "Account Password",
  required_error: "Password is required",
}) 
.min(8),

email: z.string({
  description: "Account Email",
  required_error: "Email is required",
  invalid_type_error: "Invalid email format"
})
.email()
.min(5)
.trim(),

})

exports.ZAccountSchema = z.object({
  accountId: z.string({
    description: "Account ID",
    required_error: "Account ID is required",
    invalid_type_error: "Invalid Account ID"
  })
  .trim()
  .min(8),
firstName: z.string({
  description: "First name",
  required_error: "First name is required",
  invalid_type_error: "First name is not in a valid format"
})
.trim()
.min(3)
.nonempty(),
lastName: z.string({
  description: "Last name",
  required_error: "Last name is required",
  invalid_type_error: "Last name is not in a valid format"
})
.trim()
.min(3),
otherName: z.string({
  description: "Last name",
  required_error: "Last name is required",
  invalid_type_error: "Last name is not in a valid format"
})
.min(3) 
.trim()
.optional(),
profile: z.object({
  id: z.string({
    description: "Image ID",
    required_error: "Image ID is required",
    invalid_type_error: "Image ID url is invalid",
  })
  .trim()
  .url(),
  url: z.string({
    description: "Image URL",
    required_error: "Image URL is required",
    invalid_type_error: "Image url is invalid",
  })
  .trim()
  .url(),
})
.optional(),
email: z.string({
  description: "Account email",
  required_error: "Account email is required",
  invalid_type_error: "Email is invalid"
})
.email()
.trim(),
phone: z.string({
  description: "Account phone number",
  required_error: "Account phone number is required",
  invalid_type_error: "phone number is invalid"
})
.min(11)
.trim()
.max(15),
plan: z.string({
  description: "Account Plan",
  required_error: "Account plan is required",
  invalid_type_error: "plan is invalid"
})
.default("student")
.isOptional(),
school: z.string({
  description: "School name",
  required_error: "School name is required",
  invalid_type_error: "Invalid school name"
}) 
.min(5)
.trim()
.isOptional(),
schoolAbbreviation: z.string({
  description: "School abbreviation",
  required_error: "School abbreviation is required",
  invalid_type_error: "Invalid School abbreviation"
}) 
.min(2)
.trim()
.isOptional(),
verified: z.boolean({
  description: "Account status",
  required_error: "Account status is required",
})
.default(false),
type: z.enum(CONSTANTS.ACCOUNT_TYPE)
.default(CONSTANTS.ACCOUNT_TYPE_OBJ.student)
})