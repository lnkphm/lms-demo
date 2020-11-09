const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionTypes = require('./enums/QuestionTypes');

const QuestionSchema = new Schema(
  {
    text: { type: String, required: true },
    type: { type: String, required: true, enum: QuestionTypes },
    shuffle: { type: Boolean, default: true },
    feedback: { type: String },
    points: { type: Number },
    answers: [
      {
        text: { type: String },
        correct: { type: Boolean },
      },
    ],
    exams: [{ type: Schema.Types.ObjectId, ref: 'Exam' }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Question', QuestionSchema);
