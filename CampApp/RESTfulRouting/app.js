var express = require("express");
var methodOverride = require("method-override");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restful_routing");


//APP CONFIG
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));



//Mongoose/Model CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created:  {type: Date, default: Date.now}
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


//CREATE NEW BLOG
//============================
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





//SHOW PAGE ROUTE
//============================
app.get("/blogs/:id", function(req, res){
   Blog.findById(req.params.id, function(err, blog){
      if(err){
          res.redirect("/");
      } else {
          res.render("show", {blog: blog});
      }
   });
});





app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
          res.redirect("/blogs");
      } else {
          res.render("edit", {blog: foundBlog});
      } 
    });
    
});


app.put('/blogs/:id', function(req, res){
    
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updateBlog){
        if(err){
          res.redirect("/blogs");
      } else {
          res.redirect("/blogs/" + req.params._id);
      } 
  });
});




app.delete('/blogs/:id', function(req, res){
   //find blog and delete it
   Blog.findByIdAndRemove(req.params.id, function(err, removeBlog){
        if(err){
          res.redirect("/blogs");
      } else {
          res.redirect("/blogs");
      } 
  });
});


//===========================
//== start SERVER 
//===========================

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server has started");
});