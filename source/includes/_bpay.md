# BPAY
## Overview
The BPAY APIs do not perform any financial transactions and are used to validate BPAY information that is used in the financial/v1/transaction/ execute API. The financial/v1/transaction/validate APIs also validates BPAY information using the same sub-system as documented in this section before performing any financial transactions.


**Important Notes:**

 * By design, BPAY validation can be time sensitive. If you cache valid BPAY information for later use, it may become invalid due to time expiry.
 * By design, BPAY validation can be amount sensitive. If you cache valid BPAY information for later use and change the amount to pay then this could be invalid.
 * BPAY validation should be performed immediately before calling the financial/v1/transaction/execute API to perform the bill payment. You have the option of calling financial/v1/transaction/validate (The first validation error will be returned which may not be a BPAY error)

## Objects
### BPAYBiller

> Schema for this object


```json
{
  "billerCode":             string,
  "billerLongName":         string,
  "billerShortName":        string,
  "acceptedPaymentMethods": string,
  "activationDate":         string,
  "deactivationDate":       string,
  "minPaymentAmount":       number,
  "maxPaymentAmount":       number,
  "crnValidationRuleName":  string,
  "checkDigitRuleName":     string,
  "lengthMask":             string,
  "fixedDigits":            string,
  "isVariableCrn":          string
}
```


Provides comprehensive biller information that may be required for further complex validation.

Field Name|Type|Max Size | Description
----|---|---|----
billerCode | string | 10 | This is the BPAY biller code that was requested. billerCode must be numeric 
billerLongName| string | 50 | A long description of the biller name
billerShortName | string | 20 | A short decription of the biller name 
acceptedPaymentMethods | string | | Always set to “1”. Field reserved for future expansion.
activationDate | string | | Date this biller was activated for BPAY. ISO 8601 date format with time set to 00:00:00. Note that Timezone is suppressed. The default Timezone is Sydney local time.
deactivationDate | string  | |  Date this biller was deactivated for BPAY. ISO 8601 date format with time set to 00:00:00 or an empty string if not deactivated. Note that Timezone is suppressed. The default Timezone is Sydney local time.
minPaymentAmount |  number |  |  This is the minimum amount that the BPAY biller associated with the billerCode accepts for bill payment.
maximumPaymentAmount |  number |  |  This is the maximum amount that the BPAY biller associated with the billerCode accepts for bill payment.
crnValidationRuleName | string | |   For internal use only. Set to an empty string.
checkDigitRuleName |  string |  |  For internal use only. Set to an empty string.
lengthMask |  string | 20 | A mask in which the position of each ‘Y’ character indicates each valid length that the reference number can take. At least one ‘Y’ character will be present. 
fixedDigits | string | 20 | This describes which, if any, fixed digits that are standard in the BPAY Customer Reference Number.
isVariableCrn | boolean | |  Indicates whether BPAY Customer Reference Numbers (CRN) for this biller changes for each individual customer’s bill or do they remain the same. Non variable CRNs can be stored and used later, however they must always be validated as part of paying a bill via the gateway. Variable CRNs should not be stored as they are incorrect for subsequent bills.

### BPAYBillerList

> Schema for this object


```json
{
  "billers":    [
                  BPAYBiller
                ],
  "search":     string,
  "totalCount": number,
  "skip":       number,
  "take":       number
}
```


Provides an array of BPAYBiller classes


Field Name|Type | Description
----|---|-------
billers |[BPAYBillers] |See BPAYBiller class.
search  |string | The search string.
totalCount | number | The total number of BPAYBiller’s that match the search criteria.
skip | number | The actual number of records skipped.
take | number | The number of records that were requested.


### BPAYHistoryItem

> Schema for this object


```json
{
  "billerCode":               string,
  "customerReferenceNumber":  string,
  "billerName":               string,
  "count":                    number
}
```


Contains previous BPAY payments when requesting a history list for an mWallet.


Field Name|Type | Description
----|---|-------
billerCode | string | BPAY Biller code
customerReferenceNumber | string | BPAY Customer Reference Number. If this field is empty this denotes that the customerReferenceNumber is variable for each bill and should not be reused.
billerName | string | Long form of the BPAY Biller Name
count | number | The number of usages of these details that the mWallet has succeeded in paying previously.


### BPAYValidation

> Schema for this object


```json
{
  "billerCode":               string,
  "customerReferenceNumber":  string,
  "amount":                   string,
  "billerName":               string,
  "minimumPaymentAmount":     number,
  "maximumPaymentAmount":     number
}

```


This is the result of a successful completion of a BPAY validation

Field Name|Type|Max Size | Description
----|---|---|----
billerCode | string | 10 | This is the BPAY biller code that was used to validate. billerCode must be numeric.
customerReferenceNumber | string | 20 | This is the BPAY customer reference number that was used to validate. customerReferenceNumber must be numeric.
amount |  string | 13 | This is the amount that was used to validate. The maximum value of the field is $9999999999.99 however BPAY Billers will generally restrict the maximum value accepted for bill payment.
isVariableCrn | boolean | | Indicates whether BPAY Customer Reference Numbers (CRN) for this biller change for each individual customer’s bill or do they remain the same. Non variable CRNs can be stored and used later, however they must always be validated as part of paying a bill via the gateway. Variable CRNs should not be stored as they are incorrect for subsequent bills.
billerName | string | 50 | This is the BPAY biller long name associated with the billerCode. 
minimumPaymentAmount | number |  | This is the minimum amount that the BPAY biller associated with the billerCode accepts for bill payment.
maximumPaymentAmount | number |  | This is the maximum amount that the BPAY biller associated with the billerCode accepts for bill payment.

## Biller

> The above command returns JSON structured like this:

```json
{
  "biller":            BPAYBiller,
  "status":            string,
  "statusDescription": string,
  "durationMs":        number
}
```

This API returns extended information for the BPAY biller. 


Status will be “UnknownBillerCode” if Biller Code is invalid.

### HTTP Request

`GET BASE_URL + /bpay/v1/biller/{billerCode}`

### Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
biller | BPAYBiller | See BPAYBiller object
status | string | This is the status of executing the BPAY request. A code of ‘Ok’ indicates no errors. See the section BPAY Status codes
statusDescription | string | This is a plain English description of the status
durationMs | number | This can be ignored. This value represents the total time in milliseconds that the Platform took to process the request


### BPAYBiller

> Schema for this object


```json
{
  "billerCode":             string,
  "billerLongName":         string,
  "billerShortName":        string,
  "acceptedPaymentMethods": string,
  "activationDate":         string,
  "deactivationDate":       string,
  "minPaymentAmount":       number,
  "maxPaymentAmount":       number,
  "crnValidationRuleName":  string,
  "checkDigitRuleName":     string,
  "lengthMask":             string,
  "fixedDigits":            string,
  "isVariableCrn":          string
}
```


Provides comprehensive biller information that may be required for further complex validation.

Field Name|Type|Max Size | Description
----|---|---|----
billerCode | string | 10 | This is the BPAY biller code that was requested. billerCode must be numeric 
billerLongName| string | 50 | A long description of the biller name
billerShortName | string | 20 | A short decription of the biller name 
acceptedPaymentMethods | string | | Always set to “1”. Field reserved for future expansion.
activationDate | string | | Date this biller was activated for BPAY. ISO 8601 date format with time set to 00:00:00. Note that Timezone is suppressed. The default Timezone is Sydney local time.
deactivationDate | string  | |  Date this biller was deactivated for BPAY. ISO 8601 date format with time set to 00:00:00 or an empty string if not deactivated. Note that Timezone is suppressed. The default Timezone is Sydney local time.
minPaymentAmount |  number |  |  This is the minimum amount that the BPAY biller associated with the billerCode accepts for bill payment.
maximumPaymentAmount |  number |  |  This is the maximum amount that the BPAY biller associated with the billerCode accepts for bill payment.
crnValidationRuleName | string | |   For internal use only. Set to an empty string.
checkDigitRuleName |  string |  |  For internal use only. Set to an empty string.
lengthMask |  string | 20 | A mask in which the position of each ‘Y’ character indicates each valid length that the reference number can take. At least one ‘Y’ character will be present. 
fixedDigits | string | 20 | This describes which, if any, fixed digits that are standard in the BPAY Customer Reference Number.
isVariableCrn | boolean | |  Indicates whether BPAY Customer Reference Numbers (CRN) for this biller changes for each individual customer’s bill or do they remain the same. Non variable CRNs can be stored and used later, however they must always be validated as part of paying a bill via the gateway. Variable CRNs should not be stored as they are incorrect for subsequent bills.


## Billers

> The above command returns JSON structured like this:

```json
{
  "billers":           BPAYBillerList,
  "status":            string,
  "statusDescription": string,
  "durationMs":        number
}
```


This API returns an array of BPAY billers matched to the case insensitive search string. The system matches on the billerLongName and billerShortName.


Use skip and take to page through result set. Skip and take will be changed back to their defaults if they are over-range. Status will be “UnknownBillerCode” if there are no matches.

### HTTP Request

`GET BASE_URL + /bpay/v1/billers?search={search}&skip={skip}&take={take}`

### Query Parameters

Parameter | Description
--------- | ------------
search | Text string to search for
skip | Number of items to skip over (used to implement paging). Default is 0
take | The maximum number of records to return. Default is 50

### Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
billers | [BPAYBillerList] | See BPAYBillerList object
status | string | This is the status of executing the BPAY request. A code of ‘Ok’ indicates no errors. See the section BPAY Status codes
statusDescription | string | This is a plain English description of the status
durationMs | number | This can be ignored. This value represents the total time in milliseconds that the Platform took to process the request


## History

> The above command returns JSON structured like this:

```json
{
  "history":           BPAYHistoryItem,
  "status":            string,
  "statusDescription": string,
  "durationMs":        number
}
```

This API returns the mWallets history of BPAY payments.


The returned history list is sorted by the count property of the BPAYHistoryItem descending.

### HTTP Request

`GET BASE_URL + /bpay/v1/history/{accountNumber}?take={take}`

### Query Parameters

Parameter | Description
--------- | ------------
accountNumber | The 16-Digit mWallet account number
take | The maximum number of records to return. Default is 50

### Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
billers | BPAYHistoryItem | See BPAYHistoryItem object
status | string | This is the status of executing the BPAY request. A code of ‘Ok’ indicates no errors. See the section BPAY Status codes
statusDescription | string | This is a plain English description of the status
durationMs | number | This can be ignored. This value represents the total time in milliseconds that the Platform took to process the request

## Validate

> The above command returns JSON structured like this:

```json
{
  "validation":        BPAYValidation,
  "status":            string,
  "statusDescription": string,
  "durationMs":        number
}
```

This API validates the BPAY Biller Code and optionally the BPAY Customer Reference Number and Amount. For a complete BPAY validation the BPAY Biller Code, BPAY Customer Reference Number and Amount must be supplied.


When fully validated a BPAY financial transaction should be made as soon as practicable as some BPAY combinations are date sensitive. BPAY validation uses the BPAY subsystem error codes.

### HTTP Request

`GET BASE_URL + /bpay/v1/validate/{billerCode}?custRef={customerReference}&amount={amount}`

### Query Parameters

Parameter | Description
--------- | ------------
billerCode|BPAY Biller Code
customerReference|BPAY Customer Reference Number
amount|Amount to be paid


### Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
billers | BPAYValidation | See BPAYValidation object
status | string | This is the status of executing the BPAY request. A code of ‘Ok’ indicates no errors. See the section BPAY Status codes
statusDescription | string | This is a plain English description of the status
durationMs | number | This can be ignored. This value represents the total time in milliseconds that the Platform took to process the request


## Status Codes and Descriptions

This section documents the returned status codes and the default descriptions.

Status Code | Description | HTTP Status
---|---|---
Ok | Validation has passed | 200
Unauthorized | Authentication failure | 401
ReferenceNumberCheckFailed | Variable. Describes the reason for the failure | 200
UnknownBillerCode | Unknown biller code | 200
BillerIsInactive | Biller is inactive | 200
AmountIsInvalid | Amount is invalid | 200
