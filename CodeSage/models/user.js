var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
  username: String,
  password: String,

  questionsAnswered: [{
    type: Schema.Types.ObjectId,
    ref: "Question"
  }],

  profilePictureDirectory: String,  
  mostRecentCategory: String,
  settings: Object
});


module.exports = mongoose.model('User', User);
