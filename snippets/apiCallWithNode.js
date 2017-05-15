let rp = require('request-promise');

var options = {
   method: "GET",
   uri: 'https://api.m-pay.com.au' + "/security/v1/createSecurityToken/10",
   headers: {
      'Authorization': 'Basic ' + new Buffer('6279059610001205' + ':' + '$MP@yments2968').toString('base64')
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
   });