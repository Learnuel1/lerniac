const { Schema, model } = require("mongoose"); 
const { CONSTANTS } = require("../config");

const AccountSchema = Schema({
  accountId: {
    type: String,
    require: true,
    index: true,
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  otherName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    index: true,
  },
  phone: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    index: true,
  },
  plan: {
    type: [String],
  },
  refreshToken: {
    type: [String]
  },
  type: {
    type: String,
    required: true,
    enum: CONSTANTS.ACCOUNT_TYPE,
    default: CONSTANTS.ACCOUNT_TYPE_OBJ.student,
  },
}, {timestamps: true});
const AccountModel = model("Account", AccountSchema);
module.exports = AccountModel;