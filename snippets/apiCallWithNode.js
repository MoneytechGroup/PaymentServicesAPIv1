let rp = require('request-promise');

var options = {
   uri: 'https://example.com' + API_ENDPOINT,
   headers: {
      'Authorization': 'Basic ' + new Buffer(username + ':' + passw).toString('base64')
   },
   json: true // Automatically parses the JSON string in the response 
};

rp(options)
   .then(res => {
      console.log('result:', res);
   })
   .catch(err => {
      // request failed
      console.log('error:', err);
   })