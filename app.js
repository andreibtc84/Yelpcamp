var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose")



mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// Schema Setup

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Granite Hill:", 
// 		image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("Newly created campground: ");
// 			console.log(campground);
// 		}
// 	});

var campgrounds = [
		{name: "Salmon Creek:", image: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"},
		{name: "Granite Hill:", image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},
		{name: "Mountain Goat's Rest:", image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"},
	{name: "Salmon Creek:", image: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"},
		{name: "Granite Hill:", image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},
		{name: "Mountain Goat's Rest:", image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"},
	{name: "Salmon Creek:", image: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"},
		{name: "Granite Hill:", image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},
		{name: "Mountain Goat's Rest:", image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"},
	
	]

app.get("/", function(req, res){
	res.render("landing")
});

app.get("/campgrounds", function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds:allCampgrounds});
		}
	})
	// res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
	
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	
	//Create a new Campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else{
			// redirect back to campgrounds page 
			res.redirect("/campgrounds");
		}
	});
	
});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs")
});

app.listen(3000, function() { 
  console.log('YelpCamp Server listening on port 3000'); 
});