const AccountModule = require("./account.service");


//ACCOUNT SECTION
exports.userExistByMail = async(email) =>  await AccountModule.emailExist(email)
exports.userExistByPhone = async(email) =>  await AccountModule.phoneExist(email)
exports.userExistByType = async(email) =>  await AccountModule.type(email)