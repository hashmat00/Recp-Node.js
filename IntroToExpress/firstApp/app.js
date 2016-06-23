var express = require("express");

var app = express();



app.get('/', function(req, res){
    res.send('hi there');
});


app.get('/r/:category', function(req, res) {
     var categories = req.params.category;
    res.send("You are in " + categories.toUpperCase() + " " + " Category");
});

app.get('/r/:category/comments/:id/:title', function(req, res) {
    res.send("welcome to comments id title page");
});

app.get('/bye', function(req, res){
    res.send('Good bye');
});


app.get('/dog', function(req, res) {
    res.send('MEOW');
});

app.get('*', function(req, res) {
    res.send("404 page not found");
});







app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});
