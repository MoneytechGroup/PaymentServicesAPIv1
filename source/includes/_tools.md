# Tools
## Overview

The APIs in the tools/v1/ section represent utilities that you may find useful while consuming the other APIs offered  as part of the Platform other APIs.

## Objects
### CreditCardFee
> Schema for this object

```json
{
    "feeAmountExcludingGst":				number,
    "feeAmountGstComponent":				number,
    "feeAmountIncludingGst": 				number,
    "recommendedMinimumSurchargeAmount": 	number
}
```

Contains the Fee that will be applied to your Sign-In mAccount to process a specified Credit-Card. Returned as part of the tools/v1/creditCardValidate API.


Field Name|Type| Description
----|---|-------
feeAmountExcludingGst|number|The fee amount excluding GST 
feeAmountGstComponent|number|The GST associated with the fee
feeAmountIncludingGst|number|The fee amount including GST
recommendedMinimumSurchargeAmount|number|This is the recommended minimum amount that should be added to the Credit-Card amount to cover just the Moneytech Payments Credit-Card fee. The amount is rounded up to the nearest cent, calculated using the following formula: (BaseAmount+FixedFeeIncludingGST)/(1-(PercentageFeeIncludingGST/100))

### EmailBodyDetail
> Schema for this object

```json
{
    "subject": 		string,
   	"isBodyHtml": 	boolean,
    "body": 		string
}
```

Provides details about a Credit-Card to be validated. Used by the tools/v1/creditCardValidate API.


Field Name|Type| Max Size | Description
----|---|----|---
*subject | string | 256 | This is the emails subject 
isBodyHtml | boolean | | Set to true if the body contains HTML
body | string | | Email body. Can be HTML or plain text 
*Required Field

### ValidateCreditCardDetail
> Schema for this object

```json
{
	"nameOnCard": 				string,
	"cardNumber": 				string,
	"expiryMonth": 				number,
	"expiryYear": 				number,
	"cardValidationNumber": 	string,
	"returnFee": 				boolean
	"usage": 					string,
	"amount": 					number
}
```

Provides details about a Credit-Card to be validated. Used by the tools/v1/creditCardValidate API.


Field Name|Type| Max Size | Description
----|---|----|---
*nameOnCard | string | 100 | This is the name on the Credit-Card. 
*cardNumber | string | 16 | This is the Credit-Cards number. This field must be numeric only.
*expiryMonth | number | | This is the expiry month of the Credit-Card. Must be between 1 and 12
*expiryYear | number | | This is the expiry year of the Credit-Card. Can be either a 2 or 4 digit year
*cardValidationNumber | string | 4 | This is the Credit-Cards validation number. Must be a 4 or 3 digit number depending on the card type.
*returnFee | boolean	| | Set to true if you want the fee that will be debited from your Sign-In mAccount returned. Default is false
usage | string | | This field indicates how you intend to use the Credit-Card. Options are to either debit the Credit-Card for some funds or apply a refund to the card. This field must be one of either debit or refund. Required if returnFee is true.
amount | number | | The amount you intend to either debit the Credit-Card or refund back on the card. Required if returnFee is true
*Required Field

## Validate ABN

> The above command returns JSON structured like this:

```json
{
	"abn": 										string,
	"businessPhysicalAddressEffectiveFromDate":	string,
	"businessPhysicalAddressPostCode": 			string,
	"businessPhysicalAddressStateCode": 		string,
	"entityTypeCode": 							string,
	"entityTypeDescription": 					string,
	"isAbnValid": 								boolean,
	"isCharity": 								boolean,
	"lastUpdatedDate": 							string,
	"legalName": 								string,
	"organisationName": 						string,
	"organisationNameFromDate": 				string,
  	"status": 									string,
  	"statusDescription": 						string,
  	"durationMs": 								number
}

```

The purpose of this API is to validate that an ABN (Australian Business Number) is correct and determine if it’s valid. This API makes a call to the Australian Business Registry returning current details about the company. 


An ABN is defined as a string of eleven numeric digits. Spaces are allowed but no other characters.


If the resulting status property contains ‘Ok’ then examine the property isAbnValid. The property isCharity will be true if the entity is an active registerd charity. A list of codes and mor information is available at http://abr.business.gov.au/Documentation/ReferenceData


### HTTP Request

`GET BASE_URL + /tools/v1/abnValidate/{abnNumber}`

### Response Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
abn | string | The Australian Business Number that was passed as a parameter formatted as ’99 999 999 999’.
businessPhysicalAddressEffectiveFromDate | string | The date the business physical address was last updated
businessPhysicalAddressPostCode | string | The post code of the business physical address
businessPhysicalAddressStateCode | string | The state code of the business physical address – eg. ‘NSW’
entityTypeCode | string | The abbreviation of the type of business entity
entityTypeDescription | string | A description the type of business entity
isAbnValid | boolean | If true, indicates the identity has a valid ABN
isCharity | boolean | If true, indicates the identity is a registered charity
lastUpdatedDate | string | The date the ABN record was last updated
legalName | string | If business is a Sole Trader, contains the persons name
organisationName | string | The current name of the business entity
organisationNameFromDate | string | The date the organisationName was last updated
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Validate BSB

> The above command returns JSON structured like this:

```json
{
	"bsb": 					string,
	"bankCode": 			string,
	"closed": 				boolean,
  	"address": 				string,
  	"city": 				string,
  	"state": 				string,
  	"postCode": 			string,
  	"status": 				string,
  	"statusDescription":	string,
  	"durationMs": 			number
}
```

The purpose of this API is to return details about a BSB (Bank-State-Branch) number. The format is a string in the following format ‘999-999’.


### HTTP Request

`GET BASE_URL + /tools/v1/bsbValidate/{bsbNumber}`

### Response Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
bsb |string|The BSBNumber that was passed as a parameter
bankCode |string|The bank code e.g. ANZ, CBA, NAB, WBC etc.
closed |boolean|Indicates if the branch has been closed. If true, the address field MAY contain a reference to a replacement BSB number
address |string|The branch address
city |string|The branch city
state |string|The branch state e.g. NSW, VIC, QLD etc.
postCode |string|The branch post code
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Validate Credit Card

> The above command returns JSON structured like this:

```json
{
	"cardType":				string,
	"fee":					CreditCardFee,
  	"status": 				string,
  	"statusDescription":	string,
  	"durationMs": 			number
}
```

The purpose of this API is to return details about a BSB (Bank-State-Branch) number. The format is a string in the following format ‘999-999’.


### HTTP Request

`POST BASE_URL + /tools/v1/bsbValidate/{bsbNumber}`

### Request Body Schema

```json
{
	"nameOnCard": 			string,
	"cardNumber": 			string,
	"expiryMonth": 			number,
	"expiryYear": 			number,
	"cardValidationNumber":	string,
	"returnFee": 			boolean,
	"usage": 				string,
	"amount": 				number
}
```

### Response Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
cardType|string|"If successful, this field will contain the type of Credit-Card. 
 Only  'Visa', 'Mastercard', 'Amex' and 'Diners' are supported. Value will be null on any errors."
fee|CreditCardFee|If successful and the ValidateCreditCardDetail.returnFee field is true, this field will contain an instance of the CreditCardFee class. Value will be null on any errors.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Ping

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

The primary purpose of the ping API is to validate your credentials as well validate that the Platform servers are up and running.


### HTTP Request

`GET BASE_URL + /tools/v1/ping`

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
environment	| string | The name of the environment you are connected too: "Live" or "Staging"
version | string | A string containing the Version of the Platform engine with the current Date Time at the server.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Send Email to Issuer

> The above command returns JSON structured like this:

```json
{
  	"status": 				string,
  	"statusDescription":	string,
  	"durationMs": 			number
}
```

The purpose of this API is to provide email functionality for your application to send emails to the Sign-In Accounts Issuer.


### HTTP Request

`POST BASE_URL + /tools/v1/sendEmailToIssuer`

### Request Body Schema

```json
{
	"subject":		string,
	"isBodyHtml": 	boolean,
	"body": 		string
}
```

### Response Field Descriptions

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
RequestBodyNotValidJson | The request body was not valid JSON | 400
UnableToLoadIssuer | Unable to load Issuer details | 400

### abnValidate
Status Code	| Description |HTTP Status
---- | --------| ---------
AbnIsInvalid|ABN fails validation. A valid ABN is 11 numeric digits|200

### bsbValidate
Status Code	| Description |HTTP Status
---- | --------| ---------
InvalidBsbNumber | bsbNumber is invalid. bsbNumber must have a valid Bank-State-Branch code. Format '999-999'|400
BsbNumberNotFound | bsbNumber is was not found. This does not mean the BSB is invalid, just that the Platform currently does not have the BSB Number on file|400

### creditCardValidate
Status Code	| Description |HTTP Status
---- | --------| ---------
Ok|Credit-Card validation was successful|400
NameOnCardIsEmpty|Name must not be null or empty|400
CardNumberIsEmpty|Credit-Card number must not be null or empty|400
InvalidCreditCardNumber|Credit-Card number is invalid. Credit-Card number must be a valid Card number issued by 'Visa', 'Mastercard', 'Amex' or 'Diners'|400
InvalidExpiryMonth|Expiry month is invalid|400
InvalidExpiryYear|Expiry year is invalid|400
CardValidationNumberIsEmpty|Credit-Card Validation Number (CVN) must not be null or empty|400
UnknownBinNumber|The Credit-Card number's first 6 digits (called the BIN - Bank Identification Number) were not recognised by the Platform. Only Credit-Cards of type - 'Visa', 'Mastercard', 'Amex' and 'Diners' are supported|400
InvalidCardType|The Credit-Card number's first 6 digits (called the BIN - Bank Identification Number) represent a non-supported brand. Only'Visa', 'Mastercard', 'Amex' and 'Diners' are supported|400
"InvalidTestCreditCardNumber
"	On Development and Staging, only specific Credit-Card numbers are supported. See documentation|400
InvalidCvnLength3|Credit-Card Validation Number (CVN) must be 3 digits in length|400
InvalidCvnLength4|Credit-Card Validation Number (CVN) must be 4 digits in length|400
CardExpired|Credit-Card has expired|400
UsageInvalidValue|The usage field did not have a correct value. usage must be 'debit' or 'refund' if you set returnFee to true|400
AmountInvalidValue|The amount field must be > $0.00 if you set returnFee to true|400
YouDoNotHavePermissionToProcessCreditCards|You do not have permission to process Credit-Cards|400

### sendEmailsAsIssuer
Status Code	| Description |HTTP Status
---- | --------| ---------
Ok|Credit-Card validation was successful|400
InvalidEmailSubject|The email.subject body is empty or null|400
EmailSubjectExceedsMaxLength|Email Subject exceeds maximum length of 256|400