var express              = require("express"),
     app                 = express(),
     bodyParser          = require("body-parser"),
      mongoose            = require("mongoose"),
      passport           = require("passport"),
      flash              = require("connect-flash"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose =   require("passport-local-mongoose"),
      methodOverride        = require("method-override"),
      User                  = require("./models/user")
      
      
      var commentsRoute = require("./routes/comments"),
          campRoute     = require("./routes/camp"),
          indexRoute    = require("./routes/index")
        //   seedDB        = require("./seeds")
          
          
mongoose.connect("mongodb://localhost/camp_v8");


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//call seedDB function to remove all camps
// seedDB();



//PASSPORT CONFIG ///
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//restrict user to login
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})



                    //============== CREATE NEW CAMP ======
// Camp.create({
//     name: "kabul",
//     image: "http://www.southwoods.com/sites/default/files/each%20summer%20special%204.JPG",
//     description: "This is the new camp item description on view page"
    
// }, function(err, camp){
//     if(err){
//         console.log("Something is wrong");
//         console.log(err);
//     }else{
//         console.log("A new camp has been successfully added");
//         console.log(camp);
//     }
// });




//   var camp = [
//     {name: "kabul", image: "http://www.bryceresort.com/bryceresort/files/3d/3d4e41d1-c0da-4769-9d9c-333f535f164a.png"},
//     {name: "kabul", image: "http://www.bryceresort.com/bryceresort/files/3d/3d4e41d1-c0da-4769-9d9c-333f535f164a.png"},
//     {name: "kabul", image: "http://www.bryceresort.com/bryceresort/files/3d/3d4e41d1-c0da-4769-9d9c-333f535f164a.png"},
//     {name: "kabul", image: "http://www.southwoods.com/sites/default/files/each%20summer%20special%204.JPG"},
  
//     ];



app.use("/", indexRoute);
app.use("/camp", campRoute);
app.use("/camp/:id/comments", commentsRoute);






app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server has started");
});