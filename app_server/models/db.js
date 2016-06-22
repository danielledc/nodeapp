var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/test';
if(process.env.NODE_ENV==="production"){
	dbURI='mongodb://heroku_pjnlp2b5:neg22joooa48ucncm29alrn4maj@ds015924.mlab.com:15924/heroku_pjnlp2b5'
}
mongoose.connect(dbURI);


mongoose.connection.on('connected', function(){
		console.log('connection '+dbURI);
});
