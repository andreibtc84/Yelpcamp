var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{name: "Clouds Rest", 
	 image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1559&q=80",
	 description: " Bla bla bla"
	},
	{name: "Runc", 
	 image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
	 description: " Bla bla bla"
	},
	{name: "Cookoo Nest", 
	 image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
	 description: " Bla bla bla"
	}
]

function seedDB(){
// 	REMOVE all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		} 
		console.log("removed campgrounds!");
		// Add a new campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err)
				} else {
					console.log("added a campground");
// 					Create a comments
					Comment.create(
						{
						text: "This place is great, but I wish there was internet",
						author: "Homer"
						}, function(err, comment){
							if(err){
								console.log(err)
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment!")
							}
						});
				}
			});
		});
	});

	
// Add a few comments
}


module.exports = seedDB;