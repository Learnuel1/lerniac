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
  QUESTION_TYPE : ["practical", "theory", "objective"],
  QUESTION_TYPE_OBJ: {
    practical:  "practical",
    theory:     "theory",
    objective:  "objective",
  },
  EXAM_TYPE: ["WAEC", "JAMB", "NECO"],
  EXAM_TYPE_OBJ : {
    WAEC: "WAEC",
  JAMB: "JAMB",
  NECO: "NECO",
  },
}