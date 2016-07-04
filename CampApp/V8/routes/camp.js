var express = require("express");
var router = express.Router();


var Camp = require("../models/camp")





router.get('/', function(req, res) {
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




router.post('/', function(req, res){
   var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var NewCamp = {name: name, image: image, description: description, author: author};
    
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



router.get('/new', isLoggedIn, function(req, res) {
    res.render('new.ejs');
});


router.get('/:id', function(req, res) {
    // res.send("This is the View page of camp");
    
    Camp.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            console.log(err);
        }else{
            res.render('show', {camp: foundCamp});
        }
    });
});





// isLoggedIn
function isLoggedIn(req, res, next){
   if(req.isAuthenticated()){
       return next();
   }
   
   res.redirect('/login');
}



module.exports = router;