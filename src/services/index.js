const AccountModule = require("./account.service");
const QuestionModule = require("./question.service")
const TemporalModule = require("./temporal.service")
//ACCOUNT SECTION
exports.userExistByMail = async(email) =>  await AccountModule.emailExist(email);
exports.userExistByPhone = async(email) =>  await AccountModule.phoneExist(email);
exports.userExistByType = async(email) =>  await AccountModule.type(email);
exports.createAccount = async (info) => await AccountModule.create(info);
exports.userExistById = async (accountId) => await AccountModule.existById(accountId);
exports.userExistByToken = async (refreshToken) => await AccountModule.existByToken(refreshToken);


// QUESTION SECTION
exports.uploadQuestion = async (question) => await QuestionModule.create(question);


// TEMPORAL SECTION
exports.createTempToken = async (info) => await TemporalModule.create(info);
exports.findTempTokenByToken = async (token) => await TemporalModule.findByToken(token);
exports.findTempTokenById = async (id) => await TemporalModule.findById(id);
exports.deleteTempTokenById = async (id) => await TemporalModule.deleteById(id);
exports.deleteAllTempTokenByAcctId = async (accountId) => await TemporalModule.deleteAllTempById(accountId);