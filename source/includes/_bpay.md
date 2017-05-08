# BPay

The BPAY APIs do not perform any financial transactions and are used to validate BPAY information that is used in the financial/v1/transaction/ execute API. The financial/v1/transaction/validate APIs also validates BPAY information using the same sub-system as documented in this section before performing any financial transactions.


**Important Notes:**

 * By design, BPAY validation can be time sensitive. If you cache valid BPAY information for later use, it may become invalid due to time expiry.
 * By design, BPAY validation can be amount sensitive. If you cache valid BPAY information for later use and change the amount to pay then this could be invalid.
 * BPAY validation should be performed immediately before calling the financial/v1/transaction/execute API to perform the bill payment. You have the option of calling financial/v1/transaction/validate (The first validation error will be returned which may not be a BPAY error)

## BPay Biller

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

`GET http://example.com/bpay/v1/biller/{billerCode}`

### Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
biller | BPAYBiller | See BPAYBiller object
status | string | This is the status of executing the BPAY request. A code of ‘Ok’ indicates no errors. See the section BPAY Status codes
statusDescription | string | This is a plain English description of the status
durationMs | number | This can be ignored. This value represents the total time in milliseconds that the Platform took to process the request


## BPay Billers

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

`GET http://example.com/bpay/v1/billers?search={search}&skip={skip}&take={take}`

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


## BPay History

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

`GET http://example.com/bpay/v1/history/{accountNumber}?take={take}`

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

## BPay Validate

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

`GET http://example.com/bpay/v1/validate/{billerCode}?custRef={customerReference}&amount={amount}`

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


## BPay Statuses

This section documents the returned status codes and the default descriptions.

Status Code | Description | HTTP Status
Ok | Validation has passed | 200
Unauthorized | Authentication failure | 401
ReferenceNumberCheckFailed | Variable. Describes the reason for the failure | 200
UnknownBillerCode | Unknown biller code | 200
BillerIsInactive | Biller is inactive | 200
AmountIsInvalid | Amount is invalid | 200
