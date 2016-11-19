var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
  username: String,
  password: String,

  questionsAnswered: [{
    category: String,
    correctlyAnswered: Number
  }],

  profilePictureDirectory: String,  
  mostRecentCategory: String,
  settings: Object
});


module.exports = mongoose.model('User', User);
