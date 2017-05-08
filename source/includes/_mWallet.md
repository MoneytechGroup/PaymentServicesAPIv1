# mWallet
## Overview

These APIs do not perform any financial transactions. They are used manage mWallet information used by the Platform. The /financial/v1/transaction API verifies mAccount information using this subsystem before performing the transaction.


The mWallet/v1/ API support’s the following services:


	* mWallet/v1/close
	* mWallet/v1/create
	* mWallet/v1/financials
	* mWallet/v1/search
	* mWallet/v1/reopen
	* mWallet/v1/resetPin
	* mWallet/v1/sendStatement
	* mWallet/v1/transactions
	* mWallet/v1/update
	* mWallet/v1/validatePin
 

The following APIs require an mWallet holders 4 digit PIN for authorisation:


	* mWallet/v1/close
	* mWallet/v1/financials
	* mWallet/v1/reopen
	* mWallet/v1/transactions
	* mWallet/v1/update
	* mWallet/v1/validatePin


## Close

> The above command returns JSON structured like this:

```json
{
  "status":                string,
  "statusDescription":     string,
  "durationMs":            number
}
```

This API will set an account to be closed and no further financial transactions can be performed upon it via the gateway.


### HTTP Request

`GET http://example.com/mWallet/v1/close/{accountNumber}/{pin}`

### Field Descriptions

Field Name  | Description
--------- | -------
accountNumber | 16-Digit number representing the required mAccount
pin | This API will set an account to be closed and no further financial transactions can be performed upon it via the gateway.


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
  "mWallet":               mWalletDetails,
  "status":                string,
  "statusDescription":     string,
  "durationMs":            number
}
```

This API creates a new mWallet.


If the information supplied is not accurate or false then liability for payments may lie with the Merchant or Sign-In mAccount or client software developer. This creation process has been mandated by BPAY Pty Ltd as part of the license to use BPAY as a payment method.


Ideally client software should mask the pin from the merchant and get the customer to key in the pin number twice to ensure accuracy and to maintain privacy. The pin and the Date of Birth Fields are the ultimate authentication fields that a customer has to allow the payment.


If the customer forgets their pin then it can be reset using the ResetPin function. The customer must supply a birth date (or any other significant date) that matches the one that is registered. If a customer queries why a birthdate is needed as part of the registration process then it is for this reason.


**Note:**  Though specified as a birth date any date of significance would be appropriate. There is no date range checking to check for age etc. The date is used to allow changes to the pin only.

### HTTP Request

`POST http://example.com/mAccount/v1/close/{accountNumber}`

### Request Body Schema

```json
{
       "identifier":	  string,
       "pin":			  string,
       "name":			  string,
       "nickName":		  string,
       "dateOfBirth":	  string,
       "phone":			  string,
       "email":			  string,
       "allowDuplicates": boolean,
       "options":         [
							mWalletOptionItem
  						  ]
}
```

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
accountNumber| string|New 16-Digit mAccount account number
mWallet	| mWalletDetails | See mWalletDetails clase section
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Financials

> The above command returns JSON structured like this:

```json
{
  "financials":         mWalletFinancials,
  "status":             string,
  "statusDescription":  string,
  "durationMs":         number
}
```

This API will return the current financials for an mWallet.

### HTTP Request

`GET http://example.com/mWallet/v1/financials/{accountNumber}`

### Request Body Schema

Field Name | Description
---- | ----
accountNumber|16-Digit number representing the required mAccount
pin	| A security PIN supplied by the mWallet owner

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
financials| mWalletFinancials|See mWalletFinancials class
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.




## Search

> The above command returns JSON structured like this:

```json
{
  "mWallets":           [
  						  mWalletDetails
  						],
  "status":             string,
  "statusDescription":  string,
  "durationMs":         number
}
```

This API returns an array of mWallets whose authentication fields match the search criteria specified by the identifier.


Mobile phone, land line and 16-Digit mWallet account numbers have all non-numbers stripped and email address is converted to lower case.


This is the first function to call when trying to identify a customer with an mWallet. The key piece of information returned for each mWallet is the unique accountNumber that is used in later calls and in the payment gateway.


### HTTP Request

`GET http://example.com/mWallet/v1/search?identifier={identifier}`

### Request Parameter Fields

Field Name | Description
---- | ----
identifier|Search criteria - Mobile phone number, email address, landline number or the 16-Digit mWallet account number


### Response Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
mWallets|[mWalletDetails]|See mWalletDetails class
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Reopen

> The above command returns JSON structured like this:

```json
{
  "status":             string,
  "statusDescription":  string,
  "durationMs":         number
}
```

This API will reopen an account that was closed

### HTTP Request

`GET http://example.com/mWallet/v1/repoen/{accountNumber}/{pin}`

### Request Parameter Fields

Field Name | Description
---- | ----
accountNumber|16-Digit number representing the required mAccount
pin	| A security PIN supplied by the mWallet owner

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Reset PIN

> The above command returns JSON structured like this:

```json
{
  "status":             string,
  "statusDescription":  string,
  "durationMs":         number
}
```

This API resets a customer accounts PIN. The Date of Birth is used to authenticate the user. 


This API should be used when a customer has forgotten their pin.

### HTTP Request

`POST http://example.com/mWallet/v1/resetPin`

### Request Body Schema


```json
{
       "accountNumber": string,
       "pin": 			string,
       "dateOfBirth":	string
}
```


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Send Statement

> The above command returns JSON structured like this:

```json
{
  "status":             string,
  "statusDescription":  string,
  "durationMs":         number
}
```

This API generates a detailed pdf statement for delivery via email. An error code is returned if the mWallet does not have an associated email address.

### HTTP Request

`POST http://example.com/mWallet/v1/sendStatement`

### Request Body Schema

```json
{
	"accountNumber": 	string,
	"frequency": 		string,
	"startDate": 		string,
	"endDate": 			string
}
```


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
	"openingBalance": 		number,
	"closingBalance": 		number,
	"totalDebits": 			number,
	"totalCredits": 		number,
	"items": 				[
								mWalletTransactionLineItem
	  						],
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number
}
```

This API will return an array of transactions for an mWallet between two dates. Paging is supported by using the skip and take properties of the mWalletTransactionRequestDetails class.


The information retrieved is in real-time and represents the same details as displayed on an mAccounts financial statement.

### HTTP Request

`POST http://example.com/mWallet/v1/transactions`

### Request Body Schema

```json
{
	"accountNumber":	string,
	"pin": 				string,
	"startDate":		string,
	"endDate": 			string,
	"skip": 			number,
	"take": 			number,
	"descending": 		boolean,
	"useTime":			boolean
}
```


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
openingBalance | Number | Opening balance of the mWallet for the returned items
closingBalance | Number | Closing balance of the mWallet for the returned items
totalDebits | Number | Total debits for the returned items
totalCredits | Number | Total credits for the returned items
items	[mWalletTransactionLineItem]	See mWalletTransactionLineItem class
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Update

> The above command returns JSON structured like this:

```json
{
	"mWallet":				mWalletDetails
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number
}
```

This API updates an mWallet.


If the information supplied is not accurate or false then liability for payments may lie with the merchant or Sign-In mAccount or client software developer. This update process has been mandated by BPAY Pty Ltd as part of the license to use BPAY as a payment method.


The pin or dateOfBirth Dates are not updateable.

### HTTP Request

`POST http://example.com/mWallet/v1/update`

### Request Body Schema

```json
{
	"accountNumber":	string,
	"pin":				string,
	"name":				string,
	"nickName":			string,
	"phone":			string,
	"email":			string,
	"options":			[
				  			mWalletOptionItem
					  	]
}
```


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
mWallet | mWalletDetails | See classes section
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Validate PIN

> The above command returns JSON structured like this:

```json
{
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number
}
```

This API will validate that an mWallet’s PIN is valid.


If the returned value of status is “OK” then the PIN is valid. If the value of status is “InvalidCustomerPin” the PIN is not valid.


### HTTP Request

`POST http://example.com/mWallet/v1/update`

### Request Parameter Fields

Field Name | Description
---- | ----
accountNumber|16-Digit number representing the required mAccount
pin	| A security PIN supplied by the mWallet owner


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Status and Description

Status Code	| Description |HTTP Status
---- | --------| ---------
Ok | Call has succeeded. | 200
Unauthorized | Authentication Failure | 401
Error | Exception has occurred. | 400
MerchantTokenNotFound | The Merchant supplied for authentication is not a valid Merchant. | 400
MerchantNotValidToTransact | Merchant is valid but has been denied the ability to transact. | 400
InvalidToken | A parameter passed as part of the call is formatted incorrectly. The customer does not exist. statusDescription provides a detailed reason for the failure. | 400
TokenAlreadyRegistered | Trying to change a customer incorrectly or create a new customer that already exists. | 400
CustomerIsOnHold | Customer has been placed on hold and cannot perform any financial transactions. | 400
CustomerIsClosed | Customer has been closed. | 400
CustomerIsStolen | Customer has reported that another person is using their accountNumber. | 400
CustomerTokenNotFound | Customer does not exist. | 400

