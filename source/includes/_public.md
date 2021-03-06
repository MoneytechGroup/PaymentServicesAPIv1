# Public
## Overview

The public/v1/ API support’s the following services:


	- public/v1/mAccount/activatePasswordReset
	- public/v1/mAccount/sendPasswordResetEmail 
	- public/v1/ping


The APIs in this section require NO authentication.

## Activate Password Reset

```shell
my-machine$ curl -H "Content-Type: application/json" -X POST -d '{"encryptedCreds":"VoA0SbOjO+yZWHCWExpHROf3JRcNrrCccwgOOdwKvlNcYk5RyuKncEEGsHeUQuWJJsi0sHjaHU6wLQAAws9DKQXDLjv5qsjFYCzB0Ymnoc="}' BASE_URL/public/v1/mAccount/activatePasswordReset

{
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 198
}
```

```python

import requests
from requests.auth import HTTPBasicAuth

details = {
  "encryptedCreds": "VoA0SbOjO+yZWHCWExpHROf3JRcNrrCccwgOOdwKvlNcYk5RyuKncEEGsHeUQuWJJsi0sHjaHU6wLQAAws9DKQXDLjv5qsjFYCzB0Ymnoc="
}

r = requests.post(BASE_URL + "/public/v1/mAccount/activatePasswordReset", data=details)
print(r)
```

```javascript
let rp = require('request-promise');

let details = {
  "encryptedCreds": "VoA0SbOjO+yZWHCWExpHROf3JRcNrrCccwgOOdwKvlNcYk5RyuKncEEGsHeUQuWJJsi0sHjaHU6wLQAAws9DKQXDLjv5qsjFYCzB0Ymnoc="
};

var options = {
  method: "POST",
  uri: BASE_URL + "/public/v1/mAccount/activatePasswordReset",
  body: details,
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
```

> The above command expects a JSON payload structured like this:

```json
{
	"encryptedCreds": string
}
```

> The above command returns JSON structured like this:

```json
{
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number
}
```

This API will make active a password that was sent to an mAccount account holder via email. The account holder and new password are encrypted and returned as part of the hyperlink encapsulated within the email and this encrypted data is passed to this API call for activation.


**Note:** This API call uses public non authenticated access and data security is protected by using base 64 encoding of encrypted credentials. Furthermore, the encrypted credentials have a time expiry of 2 days.

### HTTP Request

`POST BASE_URL + /mAccount/v1/public/activatePasswordReset`

### Request Body Schema

See mAccountActivatePasswordReset object.

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Send Password Reset Email

```shell
my-machine$ curl -H "Content-Type: application/json" -X POST -d '{"accountNumber":"6279059700023317","resetUrlLandingPage":"https://www.mygateway.com.au/activateMerchantPassword"}' BASE_URL/public/v1/mAccount/sendPasswordResetEmail

{
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 198
}
```

```python

import requests
from requests.auth import HTTPBasicAuth

details = {
  "accountNumber": "6279059700023317",
  "resetUrlLandingPage": "https://www.mygateway.com.au/activateMerchantPassword"
}

r = requests.post(BASE_URL + "/public/v1/mAccount/sendPasswordResetEmail", data=details)
print(r)
```

```javascript
let rp = require('request-promise');

let details = {
  "accountNumber": "6279059700023317",
  "resetUrlLandingPage": "https://www.mygateway.com.au/activateMerchantPassword"
};

var options = {
  method: "POST",
  uri: BASE_URL + "/public/v1/mAccount/sendPasswordResetEmail",
  body: details,
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
```

> The above command expects a JSON payload structured like this:

```json
{
	"accountNumber":		string,
	"resetUrlLandingPage":	string
}

```

> The above command returns JSON structured like this:

```json
{
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number
}
```

This API generates a new password that is sent to the mAccount owner via their registered email. The mAccount owner can then activate the new password by hitting the hyperlink in the email. The address of the landing page that the hyperlink references can be changed to a vendors page. If the address is left blank then the hyperlink generated will take the mAccount owner to the default Platform password activation page. The hyperlink has a request parameter appended called auth that is an encrypted Base 64 string that is used as the activation credentials in the activatePasswordReset API call.


**Note:** This API call uses public non authenticated access and data security is protected by using base 64 encoding of encrypted credentials. Furthermore, the encrypted credentials have a time expiry of 2 days.

### HTTP Request

`POST BASE_URL + /mAccount/v1/public/sendPasswordResetEmail`

### Request Body Schema

See mAccountPasswordResetRequest object

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Ping

```shell
my-machine$ curl BASE_URL/public/v1/ping

{
  "environment": "Staging",
  "version": "Moneytech Payments Platform Public V1.0. Engine V:4.53.0.0 \n  Environment:Staging   DateTime:29-Nov-2016 06:54:48 AM",
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 94
}

```

```python

import requests
from requests.auth import HTTPBasicAuth

r = requests.get(BASE_URL + "/public/v1/ping")
print(r)
```

```javascript
let rp = require('request-promise');

var options = {
  uri: BASE_URL + "/public/v1/ping",
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
```

> The above command returns JSON structured like this:

```json
{
	"environment": 			string,
	"version": 				string,
  	"status": 				string,
  	"statusDescription":	string,
  	"durationMs": 			number
}
```

The primary purpose of the ping API is to validate that the Platform servers are up and running.

### HTTP Request

`GET BASE_URL + /public/v1/ping`

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
environment	| string	| The name of the environment you are connected too: "Live" or "Staging"
version | string | A string containing the Version of the Platform engine with the current Date Time at the server.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Status Codes and Descriptions

Status Code	| Description |HTTP Status
---- | --------| ---------
Ok | Call has succeeded. | 200
Unauthorized | Authentication Failure | 401
Error | Exception has occurred. | 400