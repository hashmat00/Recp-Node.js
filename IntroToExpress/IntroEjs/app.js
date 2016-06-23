var express = require("express");
var app = express();


app.get('/', function(req, res){
    res.render('home.ejs');
});


app.get('/love/:message', function(req, res){
    var message = req.params.message;
    res.render('love.ejs', {messages: message});
})




app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server has started");
});