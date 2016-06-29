var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog-demo");

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
    posts: [postSchema]
});


var User = mongoose.model("User", userSchema);


//====================================================

// CREATE NEW USER WITH POSTS
// var newUser = new User({
//     name: "john",
//     email: "john@aol.com",
    
// });

// newUser.posts.push({
//     title: "user post",
//     content: "user post contnetn is here.."
// });

// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
        
//     }else{
//         console.log(user);
//     }
// });


//====================================================
// CREAATE NEW POST

// var newPost = new Post({
//   title: "Post",
//   content: "first post content here.."
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
        
//     }else{
//         console.log(post);
//     }
// });




//RETRIVE ALL USERS WITH POSTS
User.findOne({name: "john"}, function(err, user){
        if(err){
        console.log(err);
        
    }else{
            user.posts.push({
                title: "2nd Post",
                content: "my second post content goes here..."
            });
            user.save(function(err, post){
            if(err){
                console.log(err);
                
            }else{
                console.log(post);
            }
        });
    }
    
});