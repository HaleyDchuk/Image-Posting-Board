//Author: Haley Danylchuk 

//required modules
var mongoose = require('mongoose'); 
var URLSlugs = require('mongoose-url-slugs');

//SCHEMA GOES HERE 
var Image = new mongoose.Schema({
	caption: String,  
	url: String
});

var ImagePost = new mongoose.Schema({
	title: String, 
	images: [Image]

}); 

//mongoose-url-slugs plugin to automatically generate a slug property 
//Image.plugin(URLSlugs('caption url'));
ImagePost.plugin(URLSlugs('title'));

//using schemas to define models, used as Constructors later in the project 
mongoose.model('Image', Image);
mongoose.model('ImagePost', ImagePost);

//connects to a local instance of MongoDB, using database called hw06 
mongoose.connect('mongodb://localhost/hw06');