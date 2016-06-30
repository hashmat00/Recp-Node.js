var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/reference-demo");


//used module.exports on the post and user file on model folder serparately
var Post = require("./models/post");
var User = require("./models/user")







//====================================================
//  CREATE USER
//====================================================

// User.create({
//     email: "johnnn@gmail.com",
//     name: "george"
// });



//====================================================
//  CREATE posts and associate post with specified user
//====================================================

// Post.create({
//     title: "Chicken kabob",
//     content: "i love barbeque always, i like chopan kabob...."
// }, function(err, post){
//     User.findOne({name: "george"}, function(err, foundUser){
//         if(err){
//             console.log(err);
//         }else{
//             foundUser.posts.push(post);
//             foundUser.save(function(err, data){
//                 if(err){
//                     console.log(err);
//                 }else{
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });




//====================================================
//FIND USER
//FIND ALL POST FOR THAT USER
//====================================================

User.findOne({name: "george"}).populate("posts").exec(function(err, user){
    if(err){
        console.log(err);
    }else{
        console.log(user);
    }
})



//====================================================