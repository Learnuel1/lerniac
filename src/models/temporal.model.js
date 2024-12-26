const { Schema, model } = require("mongoose");

const TemporalSchema = new Schema({
  id: {
    type: String,
    required: [true, "Temporal id is required"],
    unique: true,
    index: true,
  },
  token : {
    type: [String],
    required: [true, "Token is required"]
  },
  accountId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "Account id is required"],
    index: true,
  }
}, {timestamps: true});

const TemporalModel = model("Temporal", TemporalSchema);

module.exports = TemporalModel;
