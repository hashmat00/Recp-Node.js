var express = require("express");
var router = express.Router({mergeParams: true});



var Camp = require("../models/camp")
var Comments = require("../models/comments")



router.get('/new', isLoggedIn,  function(req, res) {
    Camp.findById(req.params.id, function(err, camp){
        if(err){
            console.log(err);
        }else{
            res.render('comments/new', {camp: camp});
        }
    });
});



router.post('/',  function(req, res){
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



// isLoggedIn
function isLoggedIn(req, res, next){
   if(req.isAuthenticated()){
       return next();
   }
   
   res.redirect('/login');
}



module.exports = router;