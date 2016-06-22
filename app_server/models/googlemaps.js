var publicConfig = {
  key: '<YOUR-KEY>',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true, // use https
  proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
};
var gmAPI = new GoogleMapsAPI(publicConfig);
