// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: '5P2TUxZ_4SNCBgvm2H43TQ',
  consumer_secret: 'dlHSj5s2z1ge4dG7aIMYZn345J4',
  token: 'hPXOoaWn6YcZuTKcL7ZEcMwuWFjzDvZa',
  token_secret: 'lKv-Rw3yUFj4SjD8xuQhB5IRC2Q',
});
// A callback based API is also available:

module.exports.y = yelp;
