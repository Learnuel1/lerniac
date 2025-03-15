exports.CONFIG = {
  APP_NAME: "Lerniac",
};
exports.CORS_WHITE_LIST = [""];


exports.CONSTANTS = {
  ACCOUNT_TYPE: ["Admin", "Teacher", "Student"],
  ACCOUNT_TYPE_OBJ: {
    admin: "Admin", 
    teacher: "Teacher",
     student: "Student"
  },
  PLAN: ["Free", "School", "Premium"],
  PLAN_OBJ : {
    fee: "Free",
  school: "School",
  premium: "Premium",
  },
  QUESTION_STATUS: ["Private", "Public"],
  QUESTION_STATUS_OBJ: {
    pending: "Private",
    approved: "Public", 
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