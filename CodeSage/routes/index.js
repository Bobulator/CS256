var express = require('express');
var router = express.Router();

var datalayer = require("../controllers/datalayer.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/loginUser", function(req, res) {
  
  if (datalyer.loginUser(req.query.username, req.query.password)) {
    res.send("OK");
  } else {
    res.status(400).send("Incorrect username/password");
  }
  
});

router.get('/getQuestions', function(req, res) {
  res.send()
});

module.exports = router;
