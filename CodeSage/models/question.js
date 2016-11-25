var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Question = new Schema({
  category: String,
  type: String,
  question: String,
  possibleAnswers: [{
    answer: String,
    response: String
  }],
  difficulty: { type: Number, min: 0, max: 10 },
  tryItLink: String
});

module.exports = mongoose.model('Question', Question);
