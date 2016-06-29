var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/reference-demo");

//====================================================
//POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);





//====================================================
//USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Post"
        }
        ]
});


var User = mongoose.model("User", userSchema);


//====================================================
//  CREATE USER
// User.create({
//     email: "johnnn@gmail.com",
//     name: "george"
// });


// Post.create({
//     title: "Murgh paalow",
//     content: "making palow is best deal maasalalalalal..."
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



//FIND USER


//FIND ALL POST FOR THAT USER

User.findOne({name: "george"}).populate("posts").exec(function(err, user){
    if(err){
        console.log(err);
    }else{
        console.log(user);
    }
})