// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: '5P2TUxZ_4SNCBgvm2H43TQ',
  consumer_secret: 'dlHSj5s2z1ge4dG7aIMYZn345J4',
  token: 'F_5Oj6A8lnh9Kmv1jPuDkPJi-pcKcvlC',
  token_secret: '1fQHYApunKXu9693rvUGQqo20Dk',
});
// A callback based API is also available:

module.exports.y = yelp;
