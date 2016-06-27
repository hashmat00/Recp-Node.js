var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// Model
var Cat = mongoose.model("cat", catSchema);


          // ADDING CAT WITH "NEW" METHOD

// adding a new cat to database
// var george = new Cat({
//     name: "george",
//     age:  20,
//     temperament: "Vanilla"
// });

// george.save(function(err, cat){
//     if(err){
//         console.log("somethign wrong happened");
//         console.log(err);
//     }else{
//         console.log("Success, new cat has been added to database");
//         console.log(cat);
//     }
// });


        // ADDING CAT WITH "CREATE" METHOD
Cat.create({
    name: "Lucy",
    age: 20,
    temperament: "Jucy"
}, function(err, cats){
        if(err){
        console.log("somethign wrong happened");
        console.log(err);
    }else{
        console.log("Success, new cat has been added to database");
        console.log(cats);
    }
});




//retrieve all cats from datababse
Cat.find({}, function(err, cats){
    if(err){
        console.log("cannot connect to database");
        console.log(err);
    }else{
        console.log(cats);
    }
});