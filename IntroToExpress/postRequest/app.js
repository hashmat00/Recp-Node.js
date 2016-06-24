var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

 var friends = ['joh', 'mike', 'sophie'];


app.get('/', function(req, res){
    res.render('home');
});

 
 
app.post('/addfriend', function(req, res){
  var makefriend = req.body.newfriend;
  friends.push(makefriend);
  
  res.redirect('/friends');
});


 
app.get('/friends', function(req, res){
   
    res.render('friends', {friends: friends});
});






app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server has started");
});