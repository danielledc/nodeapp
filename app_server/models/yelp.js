const yelp = require('yelp-fusion');

const apiKey = 'EtWiGICoPPmtLt1j6CqQe-yYpLm2O4AVkGvKccKE95Qbg4Mo0rDPLHMx6H8BuHrT8cDnV_QCxv3dodL3hR8XNireT5TTHYQpewpaJy0OoZXlzphr-dOrJfnWucn5WnYx';

/*console.log(yelp.client(apiKey));
// A callback based API is also available:

module.exports.y = yelp.client(apiKey);

*/

const client = yelp.client(apiKey);

client.search({
  term:'Four Barrel Coffee',
  location: 'san francisco, ca'
}).then(response => {
  console.log(response.jsonBody.businesses[0].name);
}).catch(e => {
  console.log(e);
});