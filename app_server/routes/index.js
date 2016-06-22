var express = require('express');
var yelp = require('../models/yelp');


var mongoose=require('mongoose');
var router = express.Router();
var ctrlOthers = require('../controllers/others');

var locationSchema=new mongoose.Schema({
	storeName: String,
	address: String,
	yelpID: String,
	phone: String,
	website: String,
	hours: String
	
	
	
}, {collection: 'organicstores'});

var Loc=mongoose.model('store', locationSchema);
var homepageController= function(req, res){
	res.render('index', { title: 'Express' });
}

router.get('/about/', ctrlOthers.about);

router.get("/stores", function(req, res) {
	 Loc.find(function(err, stores) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(stores); // return all todos in JSON format
        });
});
  
router.get("/ratings", function(req, res) {

yelp.y.business(req.query.yelpID, function(err, data) {
						if (err) return console.log(error);
						console.log(res.json(data));
  
						});
});


module.exports = router;
