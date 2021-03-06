var express = require("express");
var router = express.Router();

var User                  = require("../models/user");
var passport            = require("passport");



router.get('/', function(req, res) {
    res.render('landing');
});




router.get('/register', function(req, res) {
   res.render('register'); 
});


router.post('/register', function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('error', 'Welcome to Camp ' + user.username);
            res.redirect('/camp');
        });
    });
});




// Login Routes

router.get('/login', function(req, res) {
    
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/camp',
    failureRedirect: '/login',
    failureFlash: "Invalid username or password",
    successFlash: "Welcome to Camp Tours!"
}), function(req, res){
    
});

//Logout Routes
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'Logged you out..');
    res.redirect('/login');
});



module.exports = router;