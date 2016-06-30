var mongoose  = require("mongoose");
var Camp = require("./models/camp");
var Comments = require("./models/comments");



var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah"
    }
]



function seedDB(){
        Camp.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Camp Removed");
            data.forEach(function(seed){
                Camp.create(seed, function(err, data){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("added a new campground");
                        //create comment
                        Comments.create({
                            text: "hello dear its my firs comment",
                            author: "hashmat"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            }else{
                                data.comments.push(comment);
                                data.save();
                                console.log("comments created");
                            }
                        })
                    }
                })
            })
            
        }
    });
}


module.exports = seedDB;