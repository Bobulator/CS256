var mongoose = require("mongoose");
var User = require("../models/user.js");
var Question = require("../models/question.js");


mongoose.connect("mongodb://localhost/codesage");

module.exports = {

  loginUser: loginUser,
  addUser: addUser,
  getQuestion: getQuestion,
  addQuestion: addQuestion
}


function loginUser(username, password, callback) {
  console.log("in loginUser");

  User.findOne({ username: username }, function(error, user) {
    console.log("in findOne");
    
    if (error) {
      console.log("IS BAD");
    }
    else {
      console.log("found user: ");
      console.log(user);
    
      if (user) {
        console.log(username + " " + password);
        console.log(user.username + " " + user.password);
        if (user.password === password) {
          console.log("password matched!");
          callback(true);
        } else {
          console.log("passwords didn't match");
          callback(false);
        }
      } else {
        console.log("user not found, creating user");
        addUser(username, password, callback);
      }
    }
  });  
}

function addUser(username, password, callback) {
  var user = new User({
    username: username,
    password: password,

    questionsAnswered: [],
    
    profilePictuerDirectory: "",
    mostRecentCategory: "",
    settings: null
  });

  user.save();
  callback(true);
}

function getQuestion(categories, callback) {
  console.log("in getQuestion");

  Question.find({ category: { $in: categories } }, function (error, results) {
    if (error) {
      console.log("is bad");
    } else {
      console.log(results);
      callback(results);
    }
  });
}

function addQuestion(question, callback) {
  console.log("in addQuestion");

  new Question(question).save();
  callback(true);
};
