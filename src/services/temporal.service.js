const TemporalModel = require("../models/temporal.model")

exports.create = async (info) => {
  try {
      return await TemporalModel.create({...info});
  } catch (error) {
    return {error}
  }
}
exports.findByToken = async (token) => {
  try {
      return await TemporalModel.findOne({token}).select("-_id -__v")
  } catch (error) {
    return {error}
  }
}
exports.findById = async (id) => {
  try {
      return await TemporalModel.findOne({id}).select("-_id -__v")
  } catch (error) {
    return {error}
  }
}
exports.deleteById = async (id) => {
  try {
    return await TemporalModel.findOneAndDelete({id})
  } catch (error) {
    return {error}
  }
}
exports.deleteAllTempById = async (accountId) => {
  try{
    return await TemporalModel.findOneAndDelete({accountId})
  } catch (error) {
    return {error}
  }
}