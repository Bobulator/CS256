var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var question = require('question');


var User = new Schema({
  username: String,
  password: String,

  questionsAnswered: [{
    type: ObjectId,
    ref: question
  }],

  profilePictureDirectory: String,  
  mostRecentCategory: String,
  settings: Object
});


module.exports = mongoose.model('User', User);
