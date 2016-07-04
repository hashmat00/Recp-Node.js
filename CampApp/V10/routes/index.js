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
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
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
    failureRedirect: '/login'
}), function(req, res){
    
});

//Logout Routes
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});



module.exports = router;