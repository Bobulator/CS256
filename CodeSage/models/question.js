var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Question = new Schema({
  category: String,
  type: String,
  question: String,
  possibleAnswers: [String],
  correctAnswer: Number,
  difficulty: { type: Number, min: 0, max: 10 }
});

module.exports = mongoose.model('Question', Question);
