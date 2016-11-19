var express = require('express');
var router = express.Router();

var datalayer = require("../controllers/datalayer.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
