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
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    require: true,
    trim: true,
    // unique: true,
    index: true,
    sparse: true,
  },
  plan: {
    type: String,
    enum: CONSTANTS.PLAN,
    default: CONSTANTS.PLAN_OBJ.fee,
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
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  school: {
    type: String,
    trim: true,
  },
  schoolAbbreviation: {
    type: String,
    trim: true
  }
}, {timestamps: true});
const AccountModel = model("Account", AccountSchema);
module.exports = AccountModel;