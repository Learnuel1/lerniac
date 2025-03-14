exports.CONFIG = {
  APP_NAME: "Lerniac",
};
exports.CORS_WHITE_LIST = [""];


exports.CONSTANTS = {
  ACCOUNT_TYPE: ["admin", "teacher", "student"],
  ACCOUNT_TYPE_OBJ: {
    admin: "admin", 
    teacher: "teacher",
     student: "student"
  },
  PLAN: ["Free", "School", "Premium"],
  PLAN_OBJ : {
    fee: "Free",
  school: "School",
  premium: "Premium",
  },
  QUESTION_STATUS: ["private", "public"],
  QUESTION_STATUS_OBJ: {
    pending: "private",
    approved: "public", 
  },
  EXAM_TYPE: ["WAEC", "JAMB", "NECO"],
  EXAM_TYPE_OBJ: {
    waec: "WAEC",
    jamb: "JAMB",
    neco: "NECO",
  },
  QUESTION_TYPE: ["Practical", "Theory", "Objective", "Alternative to practical"],
  QUESTION_TYPE_OBJ: {
    practical: "Practical",
    theory: "Theory",
    objective: "Objective",
    alternative: "Alternative to practical",
  },  
}