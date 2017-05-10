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


## Objects

### mWalletCreate
> Schema for this object


```json
{
	"identfier": 		string,
	"pin": 				string,
	"name": 			string,
	"nickName": 		string,
	"dateOfBirth": 		string,
	"phone": 			string,
	"email": 			string,
	"allowDuplicates":	boolean,
	"options": 			[
							WalletOptionItem
 				  		]
}
```

Provides information to create an mWallet.


**Note:**

 Either a phone number, or an email, are required. If a phone number is used then an email is not required and vice versa.

Field Name|Type | Description
----|---|------
*identifier|string|300|Email address, Telephone number, landline number or mWallet account number
*pin|	string	|4|4 digit numerical pin. 
*name|	String	|50|Full name of customer. 
nickName|string|20|This is a short form of the customer’s name. 
*dateOfBirth|	string	|	| Birth date of customer in ISO 8601 date format. This is used when changing the customers private pin number. This date need not be a Date of Birth it is just a significant date to the customer. **THIS FIELD IS THE CUSTOMERS ULTIMATE IDENTIFICATION FIELD AND IS NEEDED TO CHANGE THE PIN. IT CANNOT BE CHANGED BY THIS API.** Note that Timezone is suppressed. The default Timezone is Sydney local time
phone|	string	|11|Contact phone number. This is not used for authentication. Required field in conjunction with email address that must start with 0.
email|	string	|300|Contact email. This is not used for authentication. Required field in conjunction with phone and should contain @ and follow normal email format conventions. Converted to lowercase.
allowDuplicates|boolean	| | Id true, allowes the creation of a duplicate mWallet of any identifier type
options|	[mWalletOptionItem]| |See mWalletOptionItem class
*Required Field

### mWalletCreate
> Schema for this object


```json
{
	"createdDateTime": 				string,
	"accountNumber": 				string,
	"allowDuplicates": 				boolean,
	"name": 						string,
	"nickName": 					string,
	"email": 						string,
	"mobile": 						string,
	"lastTransactionDate": 			string,
	"contactPhone": 				string,
	"authenticationEmail": 			string,
	"authenticationMobile": 		string,
	"authenticationLandLine": 		string,
	"registeredByMAccountNumber: 	string,
	"isOnHold": 					boolean,
	"isClosed": 					boolean,
	"isStolen": 					boolean,
	"isLockedToMerMAccountNumber: 	string,
	"isRegistered": 				boolean,
	"financials": 					mWalletFinancials,
	"options": 						[
										mWalletOptionItem
  									]
}
```

Provides customer detail information as the result of the search operation.


Field Name|Type | Description
----|---|------
createdDateTime |string	||Date that this customer was created. ISO 8601 date format. Note that Timezone is suppressed. The default Timezone is Sydney local time.
accountNumber |string|16|16-Digit account number that uniquely identifies the customer.
name |string|50|Customers full name. 
nickName |string|20|This is a short form name of the customer. 
email |string|300|Email address of the customer. 
mobile |string|15|Mobile phone number of the customer.
lastTransactionDate|string| | Date of the last transaction that the customer performed. ISO 8601 date format. This is an empty string if no transactions. Note that Timezone is suppressed. The default Timezone is Sydney local time.
contactPhone|string|15|Contact phone number for customer. Can be a mobile or landline. 
authenticationEmail|string|300|Unique email address used to authenticate customer. Can be null.
authenticationMobile|string|15|Unique mobile number used to authenticate customer. Can be null.
authenticationLandLine|string|15|Unique telephone number used to authenticate customer. Can be null.
registeredByMAccountNumber|string|16|16-Digit account number of the mAccount who created the customer.
isOnHold |boolean|	The customer’s account has been put on hold
isClosed |boolean|	The customer’s account has been closed
isRegistered |boolean| | The mWallet is registered and is able to purchase restricted items from the mAccount such as BPAY.
financials |mWalletFinancials| | See mWalletFinancials class
options |[mWalletOptionItem]| | See mWalletOptionItem class
*Required Field


### mWalletFinancials
> Schema for this object


```json
{
	"actualBalance":		number,
	"availableSpend":	number,
	"availableLoad":		number
}
```

Provides current mWallet financial values


Field Name|Type | Description
----|---|------
actualBalance|number|Current remaining balance on the mWallet account
availableSpend|number|The amount of funds that can be debited from the mWallet at this time before exceeding ASIC daily limit
availableLoad|number|The amount of funds that can be credited to the mWallet before exceeding ASIC limit

### mWalletOptionItem
> Schema for this object


```json
{
  "key":    string,
  "value":  string
}

```

An mWalletOptionItem represents a key/value pair of configuration options that apply to a particular mWallet.


**Note **


 - If value is an empty string, the option represented by the key is set to its default value.
 - If the key is omitted from the array, the option represented by the key is left as is.
 - An invalid key or value will result in an error.
 - key is case insensitive


Field Name|Type| Description
----|---|------
key | string | Unique identifier of the value. See Key Definitions table below
value | string | The actual value represented by the Key

**Key Definitions**

Key | Range | Description
-----|------|------------
SendDailyStatement | “true” or “false” | Set to “true” if you would like a daily statement automatically sent to the Email address of the mAccount. If the mAccount has no transactions for the period, no statement is sent.
SendMonthlyStatement | “true” or “false” | Set to “true” if you would like a Monthly statement automatically sent to the Email address of the mAccount. Sent on the 1st of each month for the previous month. If the mAccount has no transactions for the period, no statement is sent.
MobileForSms | “0414111111”	| Mobile number to use for receiving SMS notifications

### mWalletSelectionFilter
> Schema for this object


```json
{
	"accountNumber":	string,
	"frequency": 		string,
	"startDate": 		string,
	"endDate": 			string
}
```

Provides current mWallet financial values


Field Name|Type | Description
----|---|------
*accountNumber | string | The 16-Digit account number that uniquely identifies the mWallet.
*frequency | string | An enumeration of fixed selection types. <br>All, <br>ThisMonth, <br>LastMonth, <br>ThisFinancialYear, <br>LastFinancialYear, <br>Custom
startDate | string | Start date of statement when the frequency is set to custom. In ISO 8601 date format. Note that Timezone is suppressed. The default Timezone is Sydney local time. **Required field when frequency is set to custom.**
endDate | string | End date of statement when the frequency is set to custom. In ISO 8601 date format. Note that Timezone is suppressed. The default Timezone is Sydney local time. **Required field when frequency is set to custom.**
*Required Field

### mWalletResetPin
> Schema for this object


```json
{
	"accountNumber":	string,
	"pin": 				string,
	"dateOfBirth":		string
}
```

Provides customer information for mWallet creation


Field Name|Type|Max Size | Description
----|---|----|--
*accountNumber | string	| 16| The 16-Digit mWallet account number to reset.
*pin | string | 4| 4 digit numerical pin.
*dateOfBirth | string | | Birth date of customer or require field in ISO 8601 date format. Note that Timezone is suppressed. The default Timezone is Sydney local time. 
*Required Field

### mWalletUpdate
> Schema for this object


```json
{
	"accountNumber":	string,
	"pin": 				string,
	"name": 			string,
	"nickName": 		string,
	"phone": 			string,
	"email": 			string,
	"options": 			[
							mWalletOptionItem
				  		]
}
```

Provides customer information for mWalletupdate


**Note:** 


 Either a phone number, or an email, is required. If a phone number is used then an email is not required and vice versa.


Field Name|Type|Max Size | Description
----|---|----|--
*accountNumber | string | 16 | 16-Digit mWallet account number to update.
*pin | string | 4 |  4 digit numerical pin.
*name | string | 50 | Full name of customer. 
nickName | string | 20 | This is a short form name of the customer. Can be empty 
phone | string | 11 | Contact phone number. This is not used for authentication. Required field in conjunction with email address that must start with 0. All non-numbers are stripped.
email | string | 300 | Contact email. This is not used for authentication. Limited to 300 characters. Required field in conjunction with phone and should contain @ and follow normal email format conventions. Converted to lowercase.
options	| [mWalletOptionItem]	| | See mWalletOptionItem class 


### mWalletTransactionLineItem
> Schema for this object


```json
{
	"transactionId":		number,
	"rowOrder":				number,
	"dateTime":				string,
	"description":			string,
	"debit":				number,
	"credit":				number,
	"runningBalance":		number,
	"mAccountName":			string,
	"transactionType":		string,
	"subTransactionType":	string,
	"mPaymentsId":			number
}
```

Represents a single line item or row on an mWallet statement.  See mWallet/v1/transactions


Field Name|Type | Description
----|---|------
transactionId | number | This is the transactionId that was returned from a financial transaction
*dateTime | string | The time the transaction occurred in ISO 8601 date format. Note that Timezone is suppressed. The default Timezone is Sydney local time. 
*description | string | This is the description that was passed in by the calling financial API call
*debit | number | The amount of funds debited from the mWallet
*credit | number | The amount of funds credited to the mWallet
*runningBalance | number | The current balance of the mAccount at the end of this single row transaction
rowOrder | number | If you need to sort the results, only use this field. If you sort the results on any other field, the runningBalance won’t make sense. rowOrder start at 0.
*mAccountName | string | Name of the mAccount that conducted the transaction
transactionType | string | Major keyword describing the transaction. E.g. include Payment, LoadFunds
subTransactionType | string | Minor keyword describing the transaction. E.g. GatewayMWalletCredit
mPaymentsId|number|This is the Platform internal Id for the row returned. 
*Required Fields


### mWalletTransactionRequestDetails
> Schema for this object


```json
{
	"accountNumber": 	string,
	"pin": 				string,
	"startDate": 		string,
	"endDate": 			string,
	"skip": 			number,
	"take": 			number,
	"descending": 		boolean,
	"useTime": 			boolean
}
```

Represents a single line item or row on an mWallet statement.  See mWallet/v1/transactions


Field Name|Type |Max Size| Description
----|---|----|--
*accountNumber | string | 16 | 16-Digit account number that uniquely identifies the mWallet. 
*pin | string | 4 | 4 digit numerical pin. 
startDate | string| | Start date of transaction range to retrieve. In ISO 8601 date format. Note that Timezone is suppressed. The default Timezone is Sydney local time. If not set to a valid date then the 1 Jan 2013 is used. The time component is ignored unless useTime is set to true.
endDate | string| | End date of transaction range to retrieve. In ISO 8601 date format. Note that Timezone is suppressed. The default Timezone is Sydney local time.  If not set todays date is used. The time component is ignored unless useTime is set to true.
skip | number| | Number of records to skip. 0 is the first record.
take | number| | Number of records to take. If take is 0 the all records will be returned.
descending | boolean| | Sort the returned transaction list ascending or descending.
useTime | boolean| | Use the time component of startDate and endDate in the selection.
*Required Fields

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

`GET BASE_URL + /mWallet/v1/close/{accountNumber}/{pin}`

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

`POST BASE_URL + /mAccount/v1/close/{accountNumber}`

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

`GET BASE_URL + /mWallet/v1/financials/{accountNumber}`

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

`GET BASE_URL + /mWallet/v1/search?identifier={identifier}`

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

`GET BASE_URL + /mWallet/v1/repoen/{accountNumber}/{pin}`

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

`POST BASE_URL + /mWallet/v1/resetPin`

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

`POST BASE_URL + /mWallet/v1/sendStatement`

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

`POST BASE_URL + /mWallet/v1/transactions`

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

`POST BASE_URL + /mWallet/v1/update`

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

`POST BASE_URL + /mWallet/v1/update`

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

