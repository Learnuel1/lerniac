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
 exports.create = async (info) => {
  try {
    return await AccountModel.create({...info})
  } catch (error) {
    return {error}
  }
 }
 exports.existById = async (accountId) => {
  try {
      return await AccountModel.findOne({_id:accountId});
  } catch (error) {
    return{error}
  }
}
exports.existByToken =async (refreshToken) => {
  try {
    return await AccountModel.findOne({refreshToken});
  } catch (error) {
    return{error}
  }
}