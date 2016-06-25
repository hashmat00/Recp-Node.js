var express = require("express");
var app = express();

app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.render('home');
});


app.get('/camp', function(req, res) {
    
    var camp = [
    {name: "kabul", image: "http://www.eatstaylive.com/wp-content/uploads/2015/11/3025546-poster-p-switzerland.jpg"},
    {name: "Herat", image: "http://hookedoneverything.com/wp-content/uploads/2015/05/Switzerland-Ski-Resort-Arosa.jpg"},
    {name: "Badakhshan", image: "https://5starseurope.com/country_image/switzerland/switzerland-001.jpg"},
    {name: "kabul", image: "http://trulyhandpicked.com/wp-content/uploads/2016/02/switzerland-castle-autumn-tree-beauty-hill-widescreen-landscape-switzerland-autumn-wallpaper-1455201749n48gk.jpg"},
    {name: "Herat", image: "http://www.enp.eu/wp-content/uploads/Zurich2.png"},
    {name: "kabul", image: "http://www.eatstaylive.com/wp-content/uploads/2015/11/3025546-poster-p-switzerland.jpg"},
    {name: "Herat", image: "http://hookedoneverything.com/wp-content/uploads/2015/05/Switzerland-Ski-Resort-Arosa.jpg"},
    {name: "Badakhshan", image: "https://5starseurope.com/country_image/switzerland/switzerland-001.jpg"},
    {name: "kabul", image: "http://trulyhandpicked.com/wp-content/uploads/2016/02/switzerland-castle-autumn-tree-beauty-hill-widescreen-landscape-switzerland-autumn-wallpaper-1455201749n48gk.jpg"},
    {name: "Herat", image: "http://www.enp.eu/wp-content/uploads/Zurich2.png"}

    ];


    res.render('camp', {camp: camp});
});







app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server has started");
});