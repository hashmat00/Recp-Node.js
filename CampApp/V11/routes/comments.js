var express = require("express");
var router = express.Router({mergeParams: true});

var middleware = require("../middleware");



var Camp = require("../models/camp")
var Comments = require("../models/comments")



router.get('/new', middleware.isLoggedIn,  function(req, res) {
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
                    req.flash('error', 'Something went wrong');
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    camp.comments.push(comment);
                    camp.save();
                     req.flash('success', 'You have successfully created the comment');
                    res.redirect('/camp/' + camp._id)
                }
            });
        }
    });
});



router.get('/:comment_id/edit', middleware.commentOwnerShip, function(req, res){
    Comments.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect('back');
        }else{
                res.render('comments/edit', {camp_id: req.params.id, comment: foundComment})
        }
    })
})


router.put('/:comment_id', middleware.commentOwnerShip, function(req, res){
    Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
        if(err){
            res.redirect('back');
        }else{
            req.flash('success', 'You have successfully edited the comment')
            res.redirect('/camp/' + req.params.id );
        }
    });
});



router.delete('/:comment_id', middleware.commentOwnerShip, function(req, res){
    Comments.findByIdAndRemove(req.params.comment_id, function(err, removeComment){
        if(err){
            res.redirect('back');
        }else{
            req.flash('error', 'You have successfully deleted the comment')
            res.redirect('/camp/' + req.params.id)
        }
    });
});



//comment ownerhip




// isLoggedIn



module.exports = router;