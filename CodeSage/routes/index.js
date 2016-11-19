var express = require('express');
var router = express.Router();

var datalayer = require("../controllers/datalayer.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CodeSage' });
});

router.get("/loginUser", function(req, res) {
  
  datalayer.loginUser(req.query.username, req.query.password, function(result) {
    
    if (result) {
      console.log("200 OK");
      res.status(200).send("OK");
    } else {
      console.log("Not OK");
      res.status(400).send("Incorrect username/password");
    }
  
  });
});

router.get('/getQuestion', function(req, res) {
  console.log(req.query.categories); 
  datalayer.getQuestion(req.query.categories, function(result) {
    
    if (result) {
      res.status(200).send(result);
    } else {
      console.log("Not OK");
      res.status(404).send("No questions of that category");
    }
  });
});

router.get('/getQuestions', function(req, res) {
  console.log("Received /getQuestions Request");
  console.log("Categories: " + req.quest.categories.toStrings());

  datalayer.getQuestions(req.query.categories, function(result) {
  
    if (result) {
      res.status(200).send(result);
    } else {
      console.log("Error retrieving questions");
      res.status(500).send("Error retrieving questions");
    }
  });

});

router.get('/getCategories', function(req, res) {
  console.log("Received /getCategories Request");
  
  datalayer.getCategories(function (result) {
    if (result) {
      res.status(200).send(result);
    } else {
      console.log("Error retrieving categories");
      res.status(500).send("Error retrieving categories");
    }
  });

});

router.get("/getProfileData", function (req, res) {
  console.log("Received /getProfileData request");
  console.log("Username: " + req.query.username.toString());

  datalayer.getProfileData(req.query.username, function (result) {
    
    if (result) {
      res.status(200).send(result);
    } else {
      console.log("Error retrieving profile data");
      res.status(500).send("Error retrieving profile data");
    }
  });

});

router.post('/addQuestion', function(req, res) {

  console.log(req.body.question);
  
  datalayer.addQuestion(req.body, function (result) {
    
    if (result) {
      res.status(200).send("OK");
    } else {
      res.status(500).send("Something horrible happened and it was your fault");
    }
  });

});


module.exports = router;
