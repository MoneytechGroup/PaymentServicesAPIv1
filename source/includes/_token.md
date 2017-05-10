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
	"accountNumber": 	string, // TokenPayloadBase
	"tokenToUpdate": 	string, // TokenPayloadBase
	"description": 		string, // TokenPayloadBase
	"creditCardNumber: 	string,
	"expiryMonth": 		number,
	"expiryYear": 		number,
	"cvn": 				string,
	"name": 			string
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
	“description”: 	string
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

> The above command expects a JSON payload structured like this:

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

> The above command expects a JSON payload structured like this:

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

> The above command expects a JSON payload structured like this:

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

> The above command expects a JSON payload structured like this:

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

> The above command expects a JSON payload structured like this:

```json
{
	"accountNumber": 			string,  // TokenPayloadBase
	"tokenToUpdate": 			string,  // TokenPayloadBase
	"description": 				string,  // TokenPayloadBase
	"billerCode": 				number,
	"customerReferenceNumber: 	string,
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

> The above command expects a JSON payload structured like this:

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










