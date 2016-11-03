var express = require('express');
var app = express(); 
var router = express.Router();
require('../db.js'); 
app.use(router); 


//adding in 
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//require mongoose 
var mongoose = require('mongoose'); 
//retrieve a model (to be used as a constructor later)
var ImagePost = mongoose.model('ImagePost');
var Image = mongoose.model('Image'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
mongoose.model('ImagePost', ImagePost); 

router.get('/image-posts', function(req, res, next){
	//list of everything in database 

	ImagePost.find(function(err, imagepost, count){
		console.log('all of the images'); 
		console.log(imagepost); 
		res.render('image-posts', {
			imagepost: imagepost
		}); 
	}); 
	

}); 
var addedTitle; 
var image1URL; 
var image1Caption; 
var image2URL; 
var image2Caption; 
var image3URL; 
var image32Caption; 
router.post('/new-instance', function(req, res, next){
	var x; 
	
	var newImages = []; 
	for(x = 1; x <= 3; x ++){
		if(req.body['imageUrl'+x] !== undefined){
			var imageObj = {
				caption: req.body['imageCaption'+x], 
				url: req.body['imageUrl'+x]
			};

			newImages.push(imageObj); 
		}
	}
	console.log("NEW CAPTION"); 
	//console.log(req.body.imageCaption1);
	console.log(newImages); 



	var imagepost = new ImagePost ({
		title: req.body.imagePostTitle, 
		images: newImages

	})

	console.log(imagepost);


	imagepost.save(function(err, image, count){
		console.log("SUCCESS");
		res.redirect('/image-posts'); 
		
	});


}); 

 
router.get('/image-posts/:slug', function(req, res, next){
	console.log("THE SLUG OKAY THE SLUG"); 
	console.log(req.params.slug); 
	var slug = req.params.slug;
	//res.send('image-post/'+slug); 
	ImagePost.findOne({slug: req.params.slug}, function(err, imagepost, count){
	
		res.render('modify', {
			imagepost: imagepost
		}); 
		//res.send('image-post/'+slug); 
		//res.send({imagepost: imagepost}); 

	
	}); 

}); 
var addedURL; 
var addedCaption; 
router.post('/modify', function(req, res, next){
	
	
}); 


















module.exports = router;
