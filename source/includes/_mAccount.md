# mAccount
## Overview

These APIs do not perform any financial transactions. They are used manage mAccount information used by the Platform. The /financial/v1/transaction API verifies mAccount information using this subsystem before performing the transaction.


The mAccount/v1/ API support’s the following services:


  - mAccount/v1/charities
  - mAccount/v1/close
  - mAccount/v1/create
  - mAccount/v1/financials
  - mAccount/v1/get
  - mAccount/v1/listAsIssuer
  - mAccount/v1/sendStatement
  - mAccount/v1/transactions


## Charities

> The above command returns JSON structured like this:

```json
{
	"items":              [
							mAccountCharityItem
  						  ],
	"status": 			  string,
	"statusDescription":  string,
	"durationMs": 		  number,
}
```

This API returns a list of charities that you are authorised to make donations too. The list includes both public and private charities you have asked Moneytech Payments to configure.

### HTTP Request

`GET http://example.com/mAccount/v1/charities`

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
items|[mAccountCharityItem]|An array of mAccountCharityIte’s. Each available charity will have an entry in this array. See the mAccountCharityItem section
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the section Status & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Close

> The above command returns JSON structured like this:

```json
{
  "status":                string,
  "statusDescription":     string,
  "durationMs":            number
}
```

This API closes an mAccount. 

### HTTP Request

`GET http://example.com/mAccount/v1/close/{accountNumber}`

### Field Descriptions

Field Name  | Description
--------- | -------
accountNumber | 16-Digit number representing the required mAccount

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Create

> The above command returns JSON structured like this:

```json
{
  "accountNumber":         string,
  "status":                string,
  "statusDescription":     string,
  "durationMs":            number
}
```

This API creates an mAccount.

### HTTP Request

`POST http://example.com/mAccount/v1/close/{accountNumber}`

### Request Body Schema

```json
{
	"accountNumber": 	string,  // This field is ignored in create
	"allowDuplicates":  boolean, // This field is only used for create
	"name": 			string,
	"abn": 				string,
	"contactName": 		string,
	"contactNumber": 	string,
	"email": 			string,
	"addressLine1": 	string,
	"addressLine2": 	string,
	"suburb": 			string,
	"state": 			string,
	"postCode": 		string,
	"bsb": 				string,
	"bankAccountNumber: string,
	"bankAccountTitle:  string,
	"financials":       mAccountFinancials, // This field is ignored in create
	"options":          [
					      mAccountOptionItem
				        ]
}
```

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
accountNumber| string|New 16-Digit mAccount account number
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Financials

> The above command returns JSON structured like this:

```json
{
  "financials":         mAccountFinancials,
  "status":                string,
  "statusDescription":     string,
  "durationMs":            number
}
```

This API will return the current financials for an mAccount.

### HTTP Request

`GET http://example.com/mAccount/v1/financials/{accountNumber}`

### Request Body Schema

Field Name | Description
---- | ----
accountNumber|16-Digit number representing the required mAccount

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
financials| mAccountFinancials|See mAccountFinancials class
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Get

> The above command returns JSON structured like this:

```json
{
  "financials":           mAccountDetails,
  "status":               string,
  "statusDescription":    string,
  "durationMs":           number
}
```

This API gets details of an mAccount.


Property details.options will contain ALL options and their current values.

### HTTP Request

`GET http://example.com/mAccount/v1/get/{accountNumber}`

### Request Body Schema

Field Name | Description
---- | ----
accountNumber|16-Digit number representing the required mAccount

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
details|mAccountDetails|See mAccountDetails class
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## listAsIssuer

> The above command returns JSON structured like this:

```json
{
  "mAccounts":            [
  							string
  						  ],
  "status":               string,
  "statusDescription":    string,
  "durationMs":           number
}
```

Returns a list of 16-Digit mAccounts that you own. These mAccounts can be used by the security/v1/createImpersonationTokenAsIssuer API. 

### HTTP Request

`GET http://example.com/mAccount/v1/listAsIssuer`


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
mAccounts|[string]|Array of 16-Digit account numbers
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.



## Send Statement

> The above command returns JSON structured like this:

```json
{
  "status":               string,
  "statusDescription":    string,
  "durationMs":           number
}
```

This API generates a detailed pdf statement for delivery via email. 


### HTTP Request

`POST http://example.com/mAccount/v1/sendStatement`

### Request Body Schema

```json
{
	"accountNumber": string,
	"frequency":     string,
	"startDate":     string,
	"endDate":       string
}
```

Field Name | Description
---- | ----
accountNumber|16-Digit number representing the required mAccount

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Transactions

> The above command returns JSON structured like this:

```json
{
  "status":               string,
  "statusDescription":    string,
  "durationMs":           number
}
```

This API generates a detailed pdf statement for delivery via email. 


### HTTP Request

`POST http://example.com/mAccount/v1/transactions`

### Request Body Schema

```json
{
	"accountNumber": 	string,
	"startDate": 		string,
	"endDate": 			string,
	"skip": 			number,
	"take": 			number,
	"descending": 		boolean,
	"useTime": 			boolean
}
```


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
openingBalance |	Number|	Opening balance of the mAccount for the returned items
closingBalance |	Number|	Closing balance of the mAccount for the returned items
totalDebits |	Number|	Total debits for the returned items
totalCredits |	Number|	Total credits for the returned items
items |	[mAccountTransactionLineItem]	| See mAccountTransactionLineItem
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.



## Update

> The above command returns JSON structured like this:

```json
{
  "status":               string,
  "statusDescription":    string,
  "durationMs":           number
}
```

This API will return an array of transactions for an mAccount between two dates. Paging is supported by using the skip and take properties of the mAccountTransactionRequestDetails class.


The information retrieved is in real-time and represents the same details as displayed on an mAccounts financial statement.


### HTTP Request

`POST http://example.com/mAccount/v1/update`

### Request Body Schema

```json
{
  "accountNumber": 		string, 
  "name": 				string,
  "abn": 				string,
  "contactName": 		string,
  "contactNumber": 		string,
  "email": 				string,
  "addressLine1": 		string,
  "addressLine2": 		string,
  "suburb": 			string,
  "state": 				string,
  "postCode": 			string,
  "bsb": 				string,
  "bankAccountNumber":  string,
  "bankAccountTitle":   string,
  "financials": 		mAccountFinancials, 	// This field is ignored in update
  "options": 			[
							mAccountOptionItem
  						]
}
```


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Status and Descriptions

Status Code | Description|HTTP Status
----|----|---
Ok |	Call has succeeded.	|200
Unauthorized |	Authentication Failure	|401
Error |	Exception has occurred.	|400
MerchantTokenNotFound |	The Merchants token was not found.	|400
MerchantNotValidToTransact |	Merchants not valid to transact.	|400
InvalidToken |	A parameter passed as part of the call is formatted incorrectly. The Merchant does not exist. statusDescription provides a detailed reason for the failure.	|400
MerchantTokenFound	|Trying to change a Merchant incorrectly or create a new mAccount that already exists.	|400
MerchanttIsOnHold|	The Merchant has been placed On-Hold	|400
MerchantIsClosed|	The Merchant has been closed	|400
AccountIsCharityNoFinancialsAllowed|You may not retrieve financial information for a Charity	|400
AccountIsCharityNoUpdateAllowed|You may not update any information on a Charity	|400
AccountIsCharityNoGetAllowed|You may not get any information on a Charity	|400
AccountIsCharityNoCloseAllowed|You may not close a Charity	|400
AccountIsCharityNoRetrieveTransactionsAllowed|You may not retrieve any financial transaction for a Charity	|400
AccountIsCharityUnableToSendStatement|You may not send a statement to a Charity	|400