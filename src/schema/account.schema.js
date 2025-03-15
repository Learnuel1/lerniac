const { z } = require("zod");
const { CONSTANTS } = require("../config");
const { isPhoneNumberValid } = require("../utils/generator");

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

const phoneNumberValidator = z.string({
  description: "Account phone number",
  required_error: "Account phone number is required",
  invalid_type_error: "phone number is invalid"
}).refine((val) => isPhoneNumberValid(val), {
  message: "Invalid phone number format",
});


exports.ZPhoneNumberSchema = phoneNumberValidator;
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
phone: phoneNumberValidator
.optional(),
plan: z.enum(CONSTANTS.PLAN)
.default(CONSTANTS.PLAN_OBJ.fee),
school: z.string({
  description: "School name",
  required_error: "School name is required",
  invalid_type_error: "Invalid school name"
}) 
.min(5)
.trim()
.optional(),
schoolAbbreviation: z.string({
  description: "School abbreviation",
  required_error: "School abbreviation is required",
  invalid_type_error: "Invalid School abbreviation"
}) 
.min(2)
.trim()
.optional(),
verified: z.boolean({
  description: "Account status",
  required_error: "Account status is required",
})
.default(false),
type: z.enum(CONSTANTS.ACCOUNT_TYPE),
password: z.string({
  description: "Account password",
  required_error: "Account password is required",
  invalid_type_error: "Invalid password" 
}).min(6,{message: "Password must be at least 6 characters long"}).trim(),
})

exports.ZResetPassword = z.object({
  password: z.string({
    description: "Password",
    required_error: "Password is required"
  })
  .min(8)
  .trim(),
})

exports.ZUpdatePassword = z.object({
  currentPassword: z.string({
    description: "Current password",
    required_error: "Current password is required",
  })
  .min(8)
  .trim(),
  newPassword: z.string({
    description: "New password",
    required_error: "New password is required"
  })
})

exports.ZUpdateAccountSchema = z.object({
  otherName: z.string({
    description: "Last name",
    required_error: "Last name is required",
    invalid_type_error: "Last name is not in a valid format"
  })
  .min(3) 
  .trim()
  .optional(), 
  phone: phoneNumberValidator
  .optional(),
  school: z.string({
    description: "School name",
    required_error: "School name is required",
    invalid_type_error: "Invalid school name"
  }) 
  .min(5)
  .trim()
  .optional(),
  schoolAbbreviation: z.string({
    description: "School abbreviation",
    required_error: "School abbreviation is required",
    invalid_type_error: "Invalid School abbreviation"
  }) 
  .min(2)
  .trim()
  .optional(),
})