const AccountModule = require("./account.service");


//ACCOUNT SECTION
exports.userExistByMail = async(email) =>  await AccountModule.emailExist(email);
exports.userExistByPhone = async(email) =>  await AccountModule.phoneExist(email);
exports.userExistByType = async(email) =>  await AccountModule.type(email);
exports.createAccount = async (info) => await AccountModule.create(info);
exports.userExistById = async (accountId) => await AccountModule.existById(accountId);
exports.userExistByToken = async (refreshToken) => await AccountModule.existByToken(refreshToken);