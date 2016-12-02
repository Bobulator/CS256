var mongoose = require("mongoose");
var User = require("../models/user.js");
var Question = require("../models/question.js");


mongoose.connect("mongodb://localhost/codesage");

module.exports = {
  loginUser: loginUser,
  addUser: addUser,
  getQuestion: getQuestion,
  getQuestions: getQuestions,
  getCategories: getCategories,
  getProfileData: getProfileData,
  addQuestion: addQuestion,
  questionAnswered: questionAnswered
}


function loginUser(username, password, callback) {
  console.log("in loginUser");

  User.findOne({ username: username }, function(error, user) {
    console.log("in findOne");
    
    if (error) {
      console.error(error);
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
      console.error(error);
      callback(false);

    } else {

      // Retrieve random question from query
      var result = results[Math.floor(Math.random() * results.length)];
      callback(result);
    }
  });
}

function getQuestions(categories, callback) {
  console.log("in getQuestions");

  Question.find({ category: { $in: categories } }, function (error, results) {
    
    if (error) {
      
      console.error(error);
      callback(false);

    } else {
      
      callback(results);
    }
  });
}

function getCategories(callback) {
  console.log("in getCategories");

  Question.distinct("category", function (error, results) {
    
    if (error) {
    
      console.error(error);
      callback(false);

    } else {

      callback(results);
    }
  });

}

function getProfileData(username, callback) {
  console.log("in getProfileData");

  User.findOne({ username: username }).populate("questionsAnswered").exec(function (error, user) {
    var profileData = {
        categoryPercentages: [],
        mostRecentCategory: user.mostRecentCategory
    };
    
    if (error) {
      console.error(error);
      callback(false);

    } else {
        console.log("Successfully retrieved user data");

        var questionAnsweredCategoryCounts = {};

        for (var i = 0; i < user.questionsAnswered.length; i++) {
          var questionAnswered = user.questionsAnswered[i];
          if (!questionAnsweredCategoryCounts[questionAnswered.category]) {
            questionAnsweredCategoryCounts[questionAnswered.category] = 0
          }

          questionAnsweredCategoryCounts[questionAnswered.category] += 1
        }

        var aggregate = [
          { 
            $group: {
              _id: "$category",
              count: { $sum: 1 }
            } 
          }
        ];
        
        Question.aggregate(aggregate, function (error, result) {
          console.log("aggregating");

          if (error) {
            console.error(error);
            callback(false);
          
          } else {
            
            for (var i = 0; i < result.length; i++) {
                var obj = result[i];

                if (questionAnsweredCategoryCounts[obj._id]) {

                  var percentage = (questionAnsweredCategoryCounts[obj._id] * 100) / obj.count;
                  profileData.categoryPercentages.push({ category: obj._id, percentage: percentage });
                } else {
                    profileData.categoryPercentages.push({ category: obj._id, percentage: 0 });
                }
            }

            callback(profileData);
          }
        });
    }
  });
}

function addQuestion(question, callback) {
  console.log("in addQuestion");

  new Question(question).save();
  callback(true);
}

function questionAnswered(params, callback) {
    var username = params.username;
    var questionId = params.questionId;

    User.findOne({ username: username }, function (error, result) {
       if (error) {
           console.error(error);
           callback(false);
       } else {
           result.questionsAnswered.push(questionId);
           result.save();
           callback(true);
       }
    });
}

