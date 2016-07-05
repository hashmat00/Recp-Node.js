var Camp = require("../models/camp");
var Comments = require("../models/comments");




var middleware = {};


middleware.campOwnerShip = function (req, res, next){
    if(req.isAuthenticated){
        Camp.findById(req.params.id, function(err, foundCamp) {
            if(err){
                res.redirect('back');
            }else{
                if(foundCamp.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect('back');
                }
            }
        })
    }else{
        res.redirect('back');
    }
}


middleware.commentOwnerShip = function (req, res, next){
if(req.isAuthenticated()){
        Comments.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}





middleware.isLoggedIn = function (req, res, next){
   if(req.isAuthenticated()){
       return next();
   }
   
   res.redirect('/login');
}


module.exports = middleware;