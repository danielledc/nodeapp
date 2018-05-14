const yelp = require('yelp-fusion');

const apiKey = 'EtWiGICoPPmtLt1j6CqQe-yYpLm2O4AVkGvKccKE95Qbg4Mo0rDPLHMx6H8BuHrT8cDnV_QCxv3dodL3hR8XNireT5TTHYQpewpaJy0OoZXlzphr-dOrJfnWucn5WnYx';

module.exports.client = yelp.client(apiKey);