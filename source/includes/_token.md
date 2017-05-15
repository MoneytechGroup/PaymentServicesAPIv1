# Token
## Overview

A token is used to obfuscate (Credit-Cards, BPAY & Australian Bank Account) Debit/Credit details. The details of token (called its payload) are stored encrypted on the Platform servers. 


It is a measure to provide a secure mechanism for storage of financially secure information. If the security of the system is compromised a tokening system will protect the sensitive financial information.


The tokening system has been designed such the generated token has no mathematical or algorithmic connection to the secret data held as the payload. The token is a random number that is manifested as a GUID.


Currently three types of payloads can be held within the tokening System. These are:

 * Credit-Card
 * Australian Bank Account
 * BPAY

Other payload types can be added if required.


If you are on a web page and you have asked the user to enter their Credit-Card details (for example), you can use the security/v1/createOneShotSecurityToken API to embed an OneShotSecurityToken in your page. Using this OneShotSecurityToken you can call the appropriate token/v1/create API passing the payload details. Using this approach, the customer’s payload details are never passed through your server.

## Objects
### TokenPayloadBase
> Schema for this object

```json
{
	"accountNumber": 	string,
	"tokenToUpdate": 	string, // Used for updates only
	"description": 		string
}
```

Used to store Australian Bank Account details as a payload within the tokenisation system.


Field Name|Type|Max Size| Description
----|---|---|----
accountNumber|string|16|The mWallet or mAccount 16-Digit number that owns the payload.
tokenToUpdate|string|36|On update and some query commands this is the token that needs updating or querying. The Token is in the form of a GUID 
description|string|256|A simple text description that is associated with the token. For example “Monthly Electricity Bill BPAY”. 

### TokenBPAYPayload
> Schema for this object

```json
{
	"accountNumber": 			string, // TokenPayloadBase
	"tokenToUpdate": 			string, // TokenPayloadBase
	"description": 				string, // TokenPayloadBase
	"billerCode": 				number,
	"customerReferenceNumber:	string,
	"amount": 					number
}
```

Used to store BPAY details as a payload within the tokenisation system.

Field Name|Type| Description
----|---|-------
billerCode | number | Biller Code as shown on the Bill. Must be a valid BPAY Biller on token creation.
customerReferenceNumber | string | Customer Reference Number as shown on the Bill. Must be a valid BPAY Customer Reference Number on token creation
amount | number | Amount as shown on the Bill. Must be a valid amount on token creation. 

### TokenCreditCardPayload
> Schema for this object

```json
{
	"accountNumber":	string, // TokenPayloadBase
	"tokenToUpdate":	string, // TokenPayloadBase
	"description":		string, // TokenPayloadBase
	"creditCardNumber":	string,
	"expiryMonth":		number,
	"expiryYear":		number,
	"cvn":				string,
	"name":				string
}
```

Used to store BPAY details as a payload within the tokenisation system.

Field Name|Type| Max Size |Description
----|---|---|---
creditCardNumber|string|16|Credit-Card Number. Card is LUN checked to ensure accuracy. 
expiryMonth|number| |Expiry month of the card. 1 = January and 12 = December. Upon creation expiryMonth is combined with expiryYear to ensure Credit-Card payload has not expired.
expiryYear|number|	| 4 digit Expiry year of the card eg 2016. expiryMonth is combined with expiryYear to ensure Credit-Card payload has not expired.
cvn|string|4|Card validation number that is tested for correct length depending upon the Credit-Card type. Visa, Mastercard and Diners cards have a cvn length of 3, whereas Amex cards have a cvn length of 4. 
name|string|100|Name appearing on the card. Must not be blank or empty. 

### TokenDetails
> Schema for this object

```json
{
	"token": 		string,
	"hint": 		string,
	"payloadType": 	string,
	"description": 	string
}
```

Used to store BPAY details as a payload within the tokenisation system.

Field Name|Type |Description
----|---|-------
token | string | The text (GUID) that identifies the token
hint | string | Text that gives sufficient information to allow the token to be selected but does not compromise security. 
payloadType | string | CreditCard, BPAY or AustralianBankAccount
description | string | Text supplied when the token was created.

## Create Australian Bank Account

```shell
my-machine$ curl -u USER:PASS -H "Content-Type: application/json" -X POST -d '{"accountNumber":"6279059700010827","description":"Savings Account","tokenToUpdate":"","bankAccountName":"Test Bank Account","bankAccountNumber":"123456789","bsb":"012-366"}' BASE_URL/token/v1/createBankAccount

{
  "token": " 9395ddef-69cb-4f38-8836-3c6502c72182",
  "hint": " Bank: ANZ Account: 123456789",
  "status": " Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 159
}
```

```python

import requests
from requests.auth import HTTPBasicAuth

details = {
  "accountNumber": "6279059700010827",
  "description": "Savings Account",
  "tokenToUpdate": "",
  "bankAccountName": "Test Bank Account",
  "bankAccountNumber": "123456789",
  "bsb": "012-366"
}

r = requests.post(BASE_URL + "/token/v1/createBankAccount", data=details, auth=HTTPBasicAuth(USER, PASS))
print(r)
```

```javascript
let rp = require('request-promise');

let details = {
  "accountNumber": "6279059700010827",
  "description": "Savings Account",
  "tokenToUpdate": "",
  "bankAccountName": "Test Bank Account",
  "bankAccountNumber": "123456789",
  "bsb": "012-366"
};

var options = {
  method: "POST",
  uri: BASE_URL + "/token/v1/createBankAccount",
  headers: {
    'Authorization': 'Basic ' + new Buffer(USER + ':' + PASS).toString('base64')
  },
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
	"accountNumber": 		string, 	// TokenPayloadBase
	"tokenToUpdate": 		string, 	// TokenPayloadBase – Not used for create
	"description": 			string, 	// TokenPayloadBase
	"bankAccountName": 		string,
	"bsb": 					string,
	"bankAccountNumber":	string
}
```

> The above command returns JSON structured like this:

```json
{
	"token":				string,
	"hint":					string,
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number
}
```

This API allows the Sign-In Account to change their Sign-In password.


The new password must be passed in twice in fields password1 and password2. 

### HTTP Request

`POST BASE_URL + /token/v1/createAustralianBankAccount`

### Request Body Schema

See TokenAustralianBankAccountPayload object.


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
token | string | New token in the form of a GUID
hint | string | Text that gives sufficient information to allow the token to be selected but does not compromise security.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Create BPAY

```shell
my-machine$ curl -u USER:PASS -H "Content-Type: application/json" -X POST -d '{"accountNumber":"6279059700010827","description":"Savings Account","tokenToUpdate":"","bankAccountName":"Test Bank Account","bankAccountNumber":"123456789","bsb":"012-366"}' BASE_URL/token/v1/createBPAY

{
  "token": "20c3a494-7010-4f22-babe-34d643e5e64f",
  "hint": "Biller: MONEYTECH FINANCE PTY LTD Reference: 6279059700010918 \n Amount: 100 IsVariable: False",
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 159
}
```

```python

import requests
from requests.auth import HTTPBasicAuth

details = {
  "accountNumber": "6279059700010827",
  "description": "Monthly Electricity Bill BPAY",
  "tokenToUpdate": "",
  "billerCode": 857763,
  "customerReferenceNumber": "6279059700010918",
  "amount": 100.00
}

r = requests.post(BASE_URL + "/token/v1/createBPAY", data=details, auth=HTTPBasicAuth(USER, PASS))
print(r)
```

```javascript
let rp = require('request-promise');

let details = {
  "accountNumber": "6279059700010827",
  "description": "Monthly Electricity Bill BPAY",
  "tokenToUpdate": "",
  "billerCode": 857763,
  "customerReferenceNumber": "6279059700010918",
  "amount": 100.00
};

var options = {
  method: "POST",
  uri: BASE_URL + "/token/v1/createBPAY",
  headers: {
    'Authorization': 'Basic ' + new Buffer(USER + ':' + PASS).toString('base64')
  },
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
	"accountNumber": 		string, 	// TokenPayloadBase
	"tokenToUpdate": 		string, 	// TokenPayloadBase – Not used for create
	"description": 			string, 	// TokenPayloadBase
	"bankAccountName": 		string,
	"bsb": 					string,
	"bankAccountNumber":	string
}
```

> The above command returns JSON structured like this:

```json
{
	"token":				string,
	"hint":					string,
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number
}
```

This API creates a token representing BPAY details by passing a TokenBPAYPayload class in the body.

### HTTP Request

`POST BASE_URL + /token/v1/createBPAY`

### Request Body Schema

See TokenBPAYPayload object.

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
token | string | New token in the form of a GUID
hint | string | Text that gives sufficient information to allow the token to be selected but does not compromise security.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Create Credit Cards

```shell
my-machine$ curl -u USER:PASS -H "Content-Type: application/json" -X POST -d '{"accountNumber":"6279059700010827","description":"Everyday use Credit-Card","tokenToUpdate":"","creditCardNumber":"5123456789012346","cvn":"000","expiryMonth":5,"expiryYear":2017,"name":"Test Credit-Card"}' BASE_URL/token/v1/createCreditCard

{
  "token": "f42b9124-4f6c-4ef5-a812-016195108865",
  "hint": "Credit-Card: Mastercard **** **** **** 2346 Exp: 5/17",
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 159
}
```

```python

import requests
from requests.auth import HTTPBasicAuth

details = {
  "accountNumber": "6279059700010827",
  "description": "Everyday use Credit-Card",
  "tokenToUpdate": "",
  "creditCardNumber": "5123456789012346",
  "cvn": "000",
  "expiryMonth": 5,
  "expiryYear": 2017,
  "name": "Test Credit-Card"
}

r = requests.post(BASE_URL + "/token/v1/createCreditCard", data=details, auth=HTTPBasicAuth(USER, PASS))
print(r)
```

```javascript
let rp = require('request-promise');

let details = {
  "accountNumber": "6279059700010827",
  "description": "Everyday use Credit-Card",
  "tokenToUpdate": "",
  "creditCardNumber": "5123456789012346",
  "cvn": "000",
  "expiryMonth": 5,
  "expiryYear": 2017,
  "name": "Test Credit-Card"
};

var options = {
  method: "POST",
  uri: BASE_URL + "/token/v1/createCreditCard",
  headers: {
    'Authorization': 'Basic ' + new Buffer(USER + ':' + PASS).toString('base64')
  },
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
	"accountNumber":	string, 	// TokenPayloadBase
	"tokenToUpdate":	string, 	// TokenPayloadBase – Not used for create
	"description":		string, 	// TokenPayloadBase
	"creditCardNumber":	string,
	"expiryMonth":		number,
	"expiryYear":		number,
	"cvn":				string,
	"name":				string
}
```

> The above command returns JSON structured like this:

```json
{
	"token":				string,
	"hint":					string,
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number
}
```

This API creates a token representing BPAY details by passing a TokenBPAYPayload class in the body.

### HTTP Request

`POST BASE_URL + /token/v1/createCreditCard`

### Request Body Schema

See TokenCreditCardPayload object.

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
token | string | New token in the form of a GUID
hint | string | Text that gives sufficient information to allow the token to be selected but does not compromise security.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Delete

```shell
my-machine$ curl -u USER:PASS -X DELETE BASE_URL/token/v1/delete/20c3a494-7010-4f22-babe-34d643e5e64f

{
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 255
}
```

```python

import requests
from requests.auth import HTTPBasicAuth

r = requests.delete(BASE_URL + "/token/v1/delete/20c3a494-7010-4f22-babe-34d643e5e64f", auth=HTTPBasicAuth(USER, PASS))
print(r)
```

```javascript
let rp = require('request-promise');

var options = {
  method: "DELETE",
  uri: BASE_URL + "/token/v1/delete/20c3a494-7010-4f22-babe-34d643e5e64f",
  headers: {
    'Authorization': 'Basic ' + new Buffer(USER + ':' + PASS).toString('base64')
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
```

> The above command returns JSON structured like this:

```json
{
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number
}
```

This API creates a token representing BPAY details by passing a TokenBPAYPayload class in the body.

### HTTP Request

`DELETE BASE_URL + /token/v1/delete/{token}`


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Get

```shell
my-machine$ curl -u USER:PASS BASE_URL/token/v1/get/8def2443-5139-4d93-9b61-ef7901363760

{
  "hint": "Biller: MONEYTECH FINANCE PTY LTD Reference: 6279059700010918 \n Amount:100  IsVariable: False",
  "payloadType": "BPAY",
  "token": "8def2443-5139-4d93-9b61-ef7901363760",
  "description": "Insurance Premium BPAY",
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 154
}
```

```python

import requests
from requests.auth import HTTPBasicAuth

r = requests.get(BASE_URL + "/token/v1/get/8def2443-5139-4d93-9b61-ef7901363760", auth=HTTPBasicAuth(USER, PASS))
print(r)
```

```javascript
let rp = require('request-promise');

var options = {
  uri: BASE_URL + "/token/v1/get/8def2443-5139-4d93-9b61-ef7901363760",
  headers: {
    'Authorization': 'Basic ' + new Buffer(USER + ':' + PASS).toString('base64')
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
```

> The above command returns JSON structured like this:

```json
{
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number,
	"token":				TokenDetails
}
```

This API will return the payload attached to the specified token.


### HTTP Request

`GET BASE_URL + /token/v1/get/{token}`


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
token|TokenDetails|See TokenDetails class for this token
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## List

```shell
my-machine$ curl -u USER:PASS BASE_URL/token/v1/list/6279059700010827

{
  "tokens": [
    {
      "hint": "Biller: MONEYTECH FINANCE PTY LTD Reference: 6279059700010918 \nAmount: 100 IsVariable: False",
      "payloadType": "BPAY",
      "token": "8def2443-5139-4d93-9b61-ef7901363760",
      "description": "Insurance Premium BPAY"
    },
    {
      "hint": "Bank: ANZ Account: 123456789",
      "payloadType": "AustralianBankAccount",
      "token": "af980b64-c0fb-4d31-b84f-5e4a4ef095a0",
      "description": "Savings Account"
    },
    {
      "hint": "Credit-Card: Mastercard **** **** **** 2346 \n Exp: 5/17",
      "payloadType": "CreditCard",
      "token": "0a4fe0d3-43c7-47ec-b089-4977cead9451",
      "description": "Personal Credit-Card"
    },
    {
      "hint": "Credit-Card: Visa **** **** **** 8769 \n Exp: 5/17",
      "payloadType": "CreditCard",
      "token": "465f2a14-f24f-48ec-a80b-bed378bf968f",
      "description": "Company Credit-Card"
    },
    {
      "hint": "Biller: MONEYTECH FINANCE PTY LTD Reference: \n 6279059700010918 Amount: 50 IsVariable: False",
      "payloadType": "BPAY",
      "token": "33ae9d47-a482-441a-89fe-92f3aa96db48",
      "description": "Electricity Account BPAY"
    },
    {
      "hint": "Bank: ANZ Account: 123456778",
      "payloadType": "AustralianBankAccount",
      "token": "4112f32f-ff76-4fbf-ab19-af676f588229",
      "description": "Cheque Account"
    }
  ],
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 154
}
```

```python

import requests
from requests.auth import HTTPBasicAuth

r = requests.get(BASE_URL + "/token/v1/list/6279059700010827", auth=HTTPBasicAuth(USER, PASS))
print(r)
```

```javascript
let rp = require('request-promise');

var options = {
  uri: BASE_URL + "/token/v1/list/6279059700010827",
  headers: {
    'Authorization': 'Basic ' + new Buffer(USER + ':' + PASS).toString('base64')
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
```

> The above command returns JSON structured like this:

```json
{
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number,
	"tokens":				[
								TokenDetails
							]
}
```

This API will return a list of all tokens associated with the provided mWallet or mAccount.

### HTTP Request

`GET BASE_URL + /token/v1/list/{accountNumber}`


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
token|[TokenDetails]|See TokenDetails class for this token
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Update Australian Bank Account

```shell
my-machine$ curl -u USER:PASS -H "Content-Type: application/json" -X POST -d '{"accountNumber":"6279059700010827","description":"Savings Account","tokenToUpdate":"9395ddef-69cb-4f38-8836-3c6502c72182","bankAccountName":"Test Bank Account","bankAccountNumber":"123456789","bsb":"012-366"}' BASE_URL/token/v1/updateAustralianBankAccount

{
  "token": "9395ddef-69cb-4f38-8836-3c6502c72182",
  "hint": "Bank: ANZ Account: 123456789",
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 159
}
```

```python

import requests
from requests.auth import HTTPBasicAuth

details = {
  "accountNumber": "6279059700010827",
  "description": "Savings Account",
  "tokenToUpdate": "9395ddef-69cb-4f38-8836-3c6502c72182",
  "bankAccountName": "Test Bank Account",
  "bankAccountNumber": "123456789",
  "bsb": "012-366"
}

r = requests.post(BASE_URL + "/token/v1/updateAustralianBankAccount", data=details, auth=HTTPBasicAuth(USER, PASS))
print(r)
```

```javascript
let rp = require('request-promise');

let details = {
  "accountNumber": "6279059700010827",
  "description": "Savings Account",
  "tokenToUpdate": "9395ddef-69cb-4f38-8836-3c6502c72182",
  "bankAccountName": "Test Bank Account",
  "bankAccountNumber": "123456789",
  "bsb": "012-366"
};

var options = {
  method: "POST",
  uri: BASE_URL + "/token/v1/updateAustralianBankAccount",
  headers: {
    'Authorization': 'Basic ' + new Buffer(USER + ':' + PASS).toString('base64')
  },
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
	"accountNumber": 		string, 	// TokenPayloadBase
	"tokenToUpdate": 		string, 	// TokenPayloadBase – Not used for create
	"description": 			string, 	// TokenPayloadBase
	"bankAccountName": 		string,
	"bsb": 					string,
	"bankAccountNumber":	string
}

```

> The above command returns JSON structured like this:

```json
{
	"token":				string,
	"hint":					string,
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number
}
```

This API allows the Sign-In Account to change their Sign-In password.


The new password must be passed in twice in fields password1 and password2. 

### HTTP Request

`POST BASE_URL + /token/v1/updateAustralianBankAccount`

### Request Body Schema

See TokenAustralianBankAccountPayload object.

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
token | string | New token in the form of a GUID
hint | string | Text that gives sufficient information to allow the token to be selected but does not compromise security.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Update BPAY

```shell
my-machine$ curl -u USER:PASS -H "Content-Type: application/json" -X POST -d '{"accountNumber":"6279059700010827","description":"Monthly Electricity Bill BPAY","tokenToUpdate":"20c3a494-7010-4f22-babe-34d643e5e64f","billerCode":857763,"customerReferenceNumber":"6279059700010918","amount":100.00}' BASE_URL/token/v1/updateBPAY

{
  "token": "20c3a494-7010-4f22-babe-34d643e5e64f",
  "hint": "Biller: MONEYTECH FINANCE PTY LTD \n Reference: 6279059700010918 Amount: 100 IsVariable: False",
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 159
}
```

```python

import requests
from requests.auth import HTTPBasicAuth

details = {
  "accountNumber": "6279059700010827",
  "description": "Monthly Electricity Bill BPAY",
  "tokenToUpdate": "20c3a494-7010-4f22-babe-34d643e5e64f",
  "billerCode": 857763,
  "customerReferenceNumber": "6279059700010918",
  "amount": 100.00
}

r = requests.post(BASE_URL + "/token/v1/updateBPAY", data=details, auth=HTTPBasicAuth(USER, PASS))
print(r)
```

```javascript
let rp = require('request-promise');

let details = {
  "accountNumber": "6279059700010827",
  "description": "Monthly Electricity Bill BPAY",
  "tokenToUpdate": "20c3a494-7010-4f22-babe-34d643e5e64f",
  "billerCode": 857763,
  "customerReferenceNumber": "6279059700010918",
  "amount": 100.00
};

var options = {
  method: "POST",
  uri: BASE_URL + "/token/v1/updateBPAY",
  headers: {
    'Authorization': 'Basic ' + new Buffer(USER + ':' + PASS).toString('base64')
  },
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
	"accountNumber": 			string,  // TokenPayloadBase
	"tokenToUpdate": 			string,  // TokenPayloadBase
	"description": 				string,  // TokenPayloadBase
	"billerCode": 				number,
	"customerReferenceNumber": 	string,
	"amount": 					number
}
```

> The above command returns JSON structured like this:

```json
{
	"token":				string,
	"hint":					string,
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number
}
```

This API provides the ability to update the payload associated with an existing token. For this API, the payload to update is a TokenBPAYPayload class. 

### HTTP Request

`POST BASE_URL + /token/v1/updateBPAY`

### Request Body Schema

See TokenBPAYPayload object.

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
token | string | New token in the form of a GUID
hint | string | Text that gives sufficient information to allow the token to be selected but does not compromise security.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Update Credit Card

```shell
my-machine$ curl -u USER:PASS -H "Content-Type: application/json" -X POST -d '{"accountNumber":"6279059700010827","description":"Everyday use Credit-Card","tokenToUpdate":"f42b9124-4f6c-4ef5-a812-016195108865","creditCardNumber":"5123456789012346","cvn":"000","expiryMonth":5,"expiryYear":2017,"name":"Test Credit-Card"}' BASE_URL/token/v1/updateCreditCard

{
  "token": "f42b9124-4f6c-4ef5-a812-016195108865",
  "hint": " Credit-Card: Mastercard **** **** **** 2346 Exp: 5/17",
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 159
}
```

```python

import requests
from requests.auth import HTTPBasicAuth

details = {
  "accountNumber": "6279059700010827",
  "description": "Everyday use Credit-Card",
  "tokenToUpdate": "f42b9124-4f6c-4ef5-a812-016195108865",
  "creditCardNumber": "5123456789012346",
  "cvn": "000",
  "expiryMonth": 5,
  "expiryYear": 2017,
  "name": "Test Credit-Card"
}

r = requests.post(BASE_URL + "/token/v1/updateCreditCard", data=details, auth=HTTPBasicAuth(USER, PASS))
print(r)
```

```javascript
let rp = require('request-promise');

let details = {
  "accountNumber": "6279059700010827",
  "description": "Everyday use Credit-Card",
  "tokenToUpdate": "f42b9124-4f6c-4ef5-a812-016195108865",
  "creditCardNumber": "5123456789012346",
  "cvn": "000",
  "expiryMonth": 5,
  "expiryYear": 2017,
  "name": "Test Credit-Card"
};

var options = {
  method: "POST",
  uri: BASE_URL + "/token/v1/updateCreditCard",
  headers: {
    'Authorization': 'Basic ' + new Buffer(USER + ':' + PASS).toString('base64')
  },
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
	"accountNumber":	string, 	// TokenPayloadBase
	"tokenToUpdate":	string, 	// TokenPayloadBase – Not used for create
	"description":		string, 	// TokenPayloadBase
	"creditCardNumber":	string,
	"expiryMonth":		number,
	"expiryYear":		number,
	"cvn":				string,
	"name":				string
}
```

> The above command returns JSON structured like this:

```json
{
	"token":				string,
	"hint":					string,
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number
}
```

This API creates a token representing BPAY details by passing a TokenBPAYPayload class in the body.

### HTTP Request

`POST BASE_URL + /token/v1/updateCreditCard`

### Request Body Schema

See TokenCreditCardPayload object.

### Response Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
token | string | New token in the form of a GUID
hint | string | Text that gives sufficient information to allow the token to be selected but does not compromise security.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Validate

```shell
# passes validation
my-machine$ curl -u USER:PASS BASE_URL/token/v1/validate/465f2a14-f24f-48ec-a80b-bed378bf968f

{
  "durationMs": 154,
  "status": "Ok",
  "statusDescription": "Operation completed successfully"
}

# fails validation
my-machine$ curl -u USER:PASS BASE_URL/token/v1/validate/465f2a14-f24f-48ec-a80b-bed378bf96ff

{
  "durationMs": 154,
  "status": "InvalidToken",
  "statusDescription": "Credit-Card has expired or will expire soon."
}
```

```python

import requests
from requests.auth import HTTPBasicAuth

r = requests.get(BASE_URL + "/token/v1/validate/465f2a14-f24f-48ec-a80b-bed378bf968f", auth=HTTPBasicAuth(USER, PASS))
print(r)
```

```javascript
let rp = require('request-promise');

var options = {
  uri: BASE_URL + "/token/v1/validate/465f2a14-f24f-48ec-a80b-bed378bf968f",
  headers: {
    'Authorization': 'Basic ' + new Buffer(USER + ':' + PASS).toString('base64')
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
```

> The above command returns JSON structured like this:

```json
{
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number
}
```

This API creates a token representing BPAY details by passing a TokenBPAYPayload class in the body.

### HTTP Request

`GET BASE_URL + /token/v1/get/{token}`

### Response Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Status Codes and Descriptions

Status Code |Description | HTTP Status
----------| ----------- | ---------
Ok |Call has succeeded. |200
Unauthorized |Authentication Failure |401
Error |Exception has occurred. |400
MerchantTokenNotFound |The Merchant supplied for authentication is not a valid Merchant. |400
MerchantNotValidToTransact |Merchant is valid but has been denied the ability to transact. |400
InvalidToken |A parameter passed as part of the call is formatted incorrectly. The Token does not exist or already exists. statusDescription provides a detailed reason for the failure.|400










