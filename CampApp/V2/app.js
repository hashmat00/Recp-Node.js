var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/camp_app");


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');



var campSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Camp = mongoose.model("camp", campSchema);


// Camp.create({
//     name: "kabul", image: "http://www.southwoods.com/sites/default/files/each%20summer%20special%204.JPG"
    
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
    res.render('home');
});


app.get('/camp', function(req, res) {
    // res.render('camp', {camp: camp});
    
    //retrieve all camps from DB 
        Camp.find({}, function(err, allCamps){
            if(err){
               console.log("Something is wrong");
                console.log(err);
            }else{
                
                res.render("camp", {camp: allCamps});
            }
        });
        
        
});




app.post('/camp', function(req, res){
   var name = req.body.name;
    var image = req.body.image;
    var NewCamp = {name: name, image: image};
    
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












app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server has started");
});