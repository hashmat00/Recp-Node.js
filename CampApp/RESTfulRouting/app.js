var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restful_routing");


//APP CONFIG
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//Mongoose/Model CONFIG
var blogSchema = new mongoose.Schema({
    name: String,
    image: String,
    body: String,
    date: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


// Blog.create({
//     title: "First Blog",
//     image: "http://images.goodsam.com/woodalls.com/tentfeatured.jpg",
//     body: "THis is my first app doing work on it"
// });

//============================
//RESTFUL ROUTES
//============================

app.get('/', function(req, res){
    res.redirect('/blogs');
});

app.get('/blogs', function(req, res){
    
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render('index', {blogs: blogs});
        }
    });
    
    
});



app.get('/blogs/new', function(req, res) {
   res.render('new'); 
});



app.post('/blogs', function(req, res) {
   //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render('new');
        }else{
            //redirect to index
            res.redirect('/blogs');
        }
        
    })
   
});





//===========================
//== start SERVER 
//===========================

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server has started");
});