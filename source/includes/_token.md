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


## Create Australian Bank Account

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

`POST http://example.com/token/v1/createAustralianBankAccount`

### Request Body Schema

```json
{
	"accountNumber": 	string, 	// TokenPayloadBase
	"tokenToUpdate": 	string, 	// TokenPayloadBase – Not used for create
	"description": 		string, 	// TokenPayloadBase
	"bankAccountName": 	string,
	"bsb": 				string,
	"bankAccountNumber": string
}

```

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
token | string | New token in the form of a GUID
hint | string | Text that gives sufficient information to allow the token to be selected but does not compromise security.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Create BPAY

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

`POST http://example.com/token/v1/createBPAY`

### Request Body Schema

```json
{
	"accountNumber": 	string, 	// TokenPayloadBase
	"tokenToUpdate": 	string, 	// TokenPayloadBase – Not used for create
	"description": 		string, 	// TokenPayloadBase
	"bankAccountName": 	string,
	"bsb": 				string,
	"bankAccountNumber": string
}

```

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
token | string | New token in the form of a GUID
hint | string | Text that gives sufficient information to allow the token to be selected but does not compromise security.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Create Credit Cards

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

`POST http://example.com/token/v1/createCreditCard`

### Request Body Schema

```json
{
	"accountNumber":	string, 	// TokenPayloadBase
	"tokenToUpdate":	string, 	// TokenPayloadBase – Not used for create
	"description":		string, 	// TokenPayloadBase
	"creditCardNumber:	string,
	"expiryMonth":		number,
	"expiryYear":		number,
	"cvn":				string,
	"name":				string
}
```

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
token | string | New token in the form of a GUID
hint | string | Text that gives sufficient information to allow the token to be selected but does not compromise security.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Delete

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

`DELETE http://example.com/token/v1/delete/{token}`


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Get

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

`GET http://example.com/token/v1/get/{token}`


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
token|TokenDetails|See TokenDetails class for this token
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## List

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

`GET http://example.com/token/v1/list/{accountNumber}`


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
token|[TokenDetails]|See TokenDetails class for this token
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Update Australian Bank Account

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

`POST http://example.com/token/v1/updateAustralianBankAccount`

### Request Body Schema

```json
{
	"accountNumber": 	string, 	// TokenPayloadBase
	"tokenToUpdate": 	string, 	// TokenPayloadBase – Not used for create
	"description": 		string, 	// TokenPayloadBase
	"bankAccountName": 	string,
	"bsb": 				string,
	"bankAccountNumber": string
}

```

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
token | string | New token in the form of a GUID
hint | string | Text that gives sufficient information to allow the token to be selected but does not compromise security.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Update BPAY

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

`POST http://example.com/token/v1/updateBPAY`

### Request Body Schema

```json
{
	"accountNumber": 	string, 	// TokenPayloadBase
	"tokenToUpdate": 	string, 	// TokenPayloadBase – Not used for create
	"description": 		string, 	// TokenPayloadBase
	"bankAccountName": 	string,
	"bsb": 				string,
	"bankAccountNumber": string
}

```

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
token | string | New token in the form of a GUID
hint | string | Text that gives sufficient information to allow the token to be selected but does not compromise security.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Update Credit Card

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

`POST http://example.com/token/v1/updateCreditCard`

### Request Body Schema

```json
{
	"accountNumber":	string, 	// TokenPayloadBase
	"tokenToUpdate":	string, 	// TokenPayloadBase – Not used for create
	"description":		string, 	// TokenPayloadBase
	"creditCardNumber:	string,
	"expiryMonth":		number,
	"expiryYear":		number,
	"cvn":				string,
	"name":				string
}
```

### Response Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
token | string | New token in the form of a GUID
hint | string | Text that gives sufficient information to allow the token to be selected but does not compromise security.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Validate

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

`GET http://example.com/token/v1/get/{token}`

### Response Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Status and Description

Status Code |Description | HTTP Status
----------| ----------- | ---------
Ok |Call has succeeded. |200
Unauthorized |Authentication Failure |401
Error |Exception has occurred. |400
MerchantTokenNotFound |The Merchant supplied for authentication is not a valid Merchant. |400
MerchantNotValidToTransact |Merchant is valid but has been denied the ability to transact. |400
InvalidToken |A parameter passed as part of the call is formatted incorrectly. The Token does not exist or already exists. statusDescription provides a detailed reason for the failure.|400










