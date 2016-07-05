var express = require("express");
var router = express.Router();

var middleware = require("../middleware");


var Camp = require("../models/camp")





router.get('/', function(req, res) {
    // res.render('camp', {camp: camp});
    
    //retrieve all camps from DB 
        Camp.find({}, function(err, allCamps){
            if(err){
               console.log("Something is wrong");
                console.log(err);
            }else{
                
                res.render("camp/index", {camp: allCamps});
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
            console.log(Createcamp);
            res.redirect('/camp');
        }
    });
});



router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('camp/new.ejs');
});


router.get('/:id', function(req, res) {
    // res.send("This is the View page of camp");
    
    Camp.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            console.log(err);
        }else{
            res.render('camp/show', {camp: foundCamp});
        }
    });
});




router.get('/:id/edit', middleware.campOwnerShip, function(req, res) {
 
          Camp.findById(req.params.id, function(err, foundCamp){
             res.render('camp/edit', {camp: foundCamp});
         
            });
        });
        
        

    


router.put('/:id',  function(req, res){
    Camp.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updateCamp){
        if(err){
            console.log(err);
        }else{
            res.redirect('/camp/' + req.params.id);
        }
    });
});





router.delete('/:id', middleware.isLoggedIn, middleware.campOwnerShip, function(req, res){
    Camp.findByIdAndRemove(req.params.id, function(err, removeCamp){
        if(err){
            res.redirect('/camp/' + req.params.id);
        }else{
            res.redirect('/camp');
        }
    });
});


// isLoggedIn




// function ownerShip(req, res, next){
//       if(req.isAuthenticated()){
        
//           Camp.findById(req.params.id, function(err, foundCamp){
//                 if(err){
//                     res.redirect('back')
//                 }else{
//                     if(foundCamp.author.id.equals(req.user._id)){
//                         next();
//                     }else{
//                         res.redirect('back');
//                     }
                    
//                 }
//         });
        
//     }else{
//         res.redirect('back');
//     }
// }





module.exports = router;