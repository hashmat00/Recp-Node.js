var express = require('express');
var app = express();



app.get('/', function(req, res){
    res.send('Welcome to homepage');
});

app.get('/speak/:animal', function(req, res){
    
    var sounds = {
        pig: "OINK",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "I have human!",
        goldfish: "...."
    }
    var animal = req.params.animal;
    var sound = sounds[animal];
    res.send('The ' + animal + " says " + sound);
});


app.get('/repeat/:message/:times', function(req, res) {
   var message = req.params.message;
   var times = req.params.times;
   var result = "";
   
    for(var i = 0; i < times; i++){
        result += message + " ";
    }
    
    res.send(result);
    
});



app.get('*', function(req, res) {
    res.send("404 Page not found my dear.....");
});





app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server has started");
});