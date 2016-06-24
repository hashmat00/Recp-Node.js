var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");




app.get('/', function(req, res){
    res.render('home');
});


app.get('/love/:message', function(req, res){
    var message = req.params.message;
    res.render('love', {messages: message});
});


app.get('/post', function(req, res) {
    var posts = [
        {title: "My first app", author: "hashmat"},
        {title: "Seasoanl journal", author: "James"},
        {title: "Welcome back", author: "John smtih"}
    ];
    
    res.render('posts', {posts: posts});
});




app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server has started");
});