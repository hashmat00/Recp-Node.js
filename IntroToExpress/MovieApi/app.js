var express = require("express");
var app = express();
var request = require('request');

app.set('view engine', 'ejs');


app.get('/result', function(req, res){
   
  request('http://omdbapi.com/?s=afghanistan', function(error, response, body){
      if(!error && response.statusCode == 200){
          var data = JSON.parse(body);
          res.render('result', {data: data});
      }
  });
});







app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server has started");
});