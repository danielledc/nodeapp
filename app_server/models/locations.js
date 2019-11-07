var mongoose = require, { 'mongoose' };
var locationSchema = new mongoose.Schema({
	storeName: String,
	address: String,
	yelpID: Number
}, { collection: 'organicstores' });
locationSchema.find(function (err, locations) {
	if (err)
		return console.error(err);
	console.log(locations);
	mongoose.model('store', locationSchema);
});
