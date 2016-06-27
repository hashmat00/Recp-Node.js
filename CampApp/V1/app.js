var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


   var camp = [
    {name: "kabul", image: "http://www.bryceresort.com/bryceresort/files/3d/3d4e41d1-c0da-4769-9d9c-333f535f164a.png"},
    {name: "kabul", image: "http://www.bryceresort.com/bryceresort/files/3d/3d4e41d1-c0da-4769-9d9c-333f535f164a.png"},
    {name: "kabul", image: "http://www.bryceresort.com/bryceresort/files/3d/3d4e41d1-c0da-4769-9d9c-333f535f164a.png"},
    {name: "kabul", image: "http://www.southwoods.com/sites/default/files/each%20summer%20special%204.JPG"},
  
    ];





app.get('/', function(req, res) {
    res.render('home');
});


app.get('/camp', function(req, res) {
    res.render('camp', {camp: camp});
});




app.post('/camp', function(req, res){
   var name = req.body.name;
    var image = req.body.image;
    var NewCamp = {name: name, image: image};
    
    camp.push(NewCamp);
    res.redirect('/camp');
    
})



app.get('/camp/new', function(req, res) {
    res.render('new.ejs');
});












app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server has started");
});