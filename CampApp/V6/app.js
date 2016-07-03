var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/camp_v4");

// import camp schema from models
var Camp = require("./models/camp")
var Comments = require("./models/comments")
var seedDB = require("./seeds");



app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));


//call seedDB function to remove all camps
seedDB();





                    //============== CREATE NEW CAMP ======
// Camp.create({
//     name: "kabul",
//     image: "http://www.southwoods.com/sites/default/files/each%20summer%20special%204.JPG",
//     description: "This is the new camp item description on view page"
    
// }, function(err, camp){
//     if(err){
//         console.log("Something is wrong");
//         console.log(err);
//     }else{
//         console.log("A new camp has been successfully added");
//         console.log(camp);
//     }
// });




//   var camp = [
//     {name: "kabul", image: "http://www.bryceresort.com/bryceresort/files/3d/3d4e41d1-c0da-4769-9d9c-333f535f164a.png"},
//     {name: "kabul", image: "http://www.bryceresort.com/bryceresort/files/3d/3d4e41d1-c0da-4769-9d9c-333f535f164a.png"},
//     {name: "kabul", image: "http://www.bryceresort.com/bryceresort/files/3d/3d4e41d1-c0da-4769-9d9c-333f535f164a.png"},
//     {name: "kabul", image: "http://www.southwoods.com/sites/default/files/each%20summer%20special%204.JPG"},
  
//     ];





app.get('/', function(req, res) {
    res.render('landing');
});


app.get('/camp', function(req, res) {
    // res.render('camp', {camp: camp});
    
    //retrieve all camps from DB 
        Camp.find({}, function(err, allCamps){
            if(err){
               console.log("Something is wrong");
                console.log(err);
            }else{
                
                res.render("index", {camp: allCamps});
            }
        });
        
        
});




app.post('/camp', function(req, res){
   var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var NewCamp = {name: name, image: image, description: description};
    
    //create new camp
    Camp.create(NewCamp, function(err, Createcamp){
        if(err){
            console.log(err);
        }else{
            //redirect to camp listing page after successfully adding a camp
            res.redirect('/camp');
        }
    });
});



app.get('/camp/new', function(req, res) {
    res.render('new.ejs');
});


app.get('/camp/:id', function(req, res) {
    // res.send("This is the View page of camp");
    
    Camp.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            console.log(err);
        }else{
            res.render('show', {camp: foundCamp});
        }
    });
});






app.get('/camp/:id/comments/new', function(req, res) {
    Camp.findById(req.params.id, function(err, camp){
        if(err){
            console.log(err);
        }else{
            res.render('comments/new', {camp: camp});
        }
    });
});



app.post('/camp/:id/comments', function(req, res){
    Camp.findById(req.params.id, function(err, camp) {
        if(err){
            console.log(err);
            res.redirect('/camp');
        }else{
            Comments.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect('/camp/' + camp._id)
                }
            });
        }
    });
});




app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server has started");
});