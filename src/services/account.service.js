const AccountModel = require("../models/account.model")

exports.emailExist = async (email) => {
  try {
      return await AccountModel.findOne({email});
  } catch (error) {
    return{error}
  }
}
exports.phoneExist = async (phone) => {
  try {
      return await AccountModel.findOne({phone});
  } catch (error) {
    return{error}
  }
}
exports.type = async (type) => {
  try {
      return await AccountModel.findOne({type});
  } catch (error) {
    return{error}
  }
}