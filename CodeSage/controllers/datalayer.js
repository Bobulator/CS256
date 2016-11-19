var mongoose = require("mongoose");
var User = require("../models/user.js");
var Question = require("../models/question.js");


function loginUser(username, password) {
  
  var user = User.find({ username: username });
  
  if (user) {
    if (user.password === password) {
      return true;  
    } else {
      return false;
    }
  } else {
    addUser(username, password);
  }
}

function addUser(username, password) {
  var user = new User({
    username: username,
    password: password,

    questionsAnswered: [],
    
    profilePictuerDirectory: "",
    mostRecentCategory: "",
    settings: null
  });

  user.save();
  return true;
}
