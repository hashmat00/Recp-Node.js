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
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect('/camp/' + camp._id)
                }
            });
        }
    });
});



router.get('/:comment_id/edit', function(req, res){
    Comments.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect('back');
        }else{
                res.render('comments/edit', {camp_id: req.params.id, comment: foundComment})
        }
    })
})


router.put('/:comment_id', function(req, res){
    Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/camp/' + req.params.id );
        }
    });
});



router.delete('/:comment_id', function(req, res){
    Comments.findByIdAndRemove(req.params.comment_id, function(err, removeComment){
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/camp/' + req.params.id)
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