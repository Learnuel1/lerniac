const {Schema,model } = require('mongoose');

const subjectSchema = new Schema({
  subjectId: {
    type: String,
    required: [true, 'Subject ID is required'],
    minlength: [2, 'Subject ID must be at least 2 characters long'],
    maxlength: [50, 'Subject ID must be at most 50 characters long'],
    index: true,
  },
  name: {
    type: String,
    required: [true, 'Subject Name is required'],
    minlength: [2, 'Subject Name must be at least 2 characters long'],
    maxlength: [50, 'Subject Name must be at most 50 characters long'],
    unique: [true, "Subject name already exists"],
    index: true,
    trim: true,
  },
  accountId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Account ID is required'],
    ref: 'Account',
    index: true,
  }
});
subjectSchema.pre('save', function(next) {
  this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
  next();
});
const SubjectModel = model('Subject', subjectSchema);

module.exports = SubjectModel;