# Reports
## Objects
### SettlementItem
> Schema for this object

```json
{
	"disbursementAmount": 		number,
	"transactionId": 			number,
	"uniqueReferenced": 		string, 
	"disbursementMethod": 		string,
	"feeAmountExclGst": 		number,
	"feeAmountGstComponent": 	number,
	"feeAmountInclGst": 		number
}
```

The Settlement API returns an array node, providing details of each settlement.

Field Name|Type| Description
----|---|-------
disbursementAmount | number | This is the settlement or the requested disbursement amount.
transactionId | number | This is the transactionId that was returned when the transaction was executed
uniqueReference | string | This is your uniqueReference that was passed in when the transaction was executed
disbursementMethod | string | This is the disbursementMethod that was used to make the settlement payment
feeAmountExclGst | number | This is the fee amount of the disbursement excluding GST
feeAmountGstComponent | number | This is the GST component of the disbursement fee
feeAmountInclGst | number | This is the fee amount of the disbursement including GST

### TransactionItem
> Schema for this object


```json
{
	"dateTime": 				string,
	"feeAmountExcludingGst": 	number,
	"feeAmountGstComponent": 	number,
	"feeAmountIncludingGst": 	number,
	"totalAmount": 				number,
	"transactionId": 			number,
	"uniqueReferenced": 		string 
}
```

The Settlement API returns an array node, providing details of each transaction.

Field Name|Type| Description
----|---|-------
dateTime| string | The date time that the transaction was executed on the Platform Servers. Format is ISO8601 - "2015-09-01T19:19:58"
feeAmountExcludingGst| number | This is the fee amount Excluding GST that has been debited from your mAccount
feeAmountGstComponent| number | This is the GST Component of the fee amount that has been debited from your mAccount 
feeAmountIncludingGst| number | This is the total fee amount Including GST that has been debited from your mAccount
totalAmount| number | This is the total amount of the transaction what was disbursed.
transactionId| number | This is the transactionId that was returned when the transaction was executed
uniqueReference| string | This is your uniqueReference that was passed in when the transaction was executed

## Settlement

```shell
# Date follows ISO8601 yyyy-mm-dd format
my-machine$ curl -u USER:PASS BASE_URL/reports/v1/settlement/2015-09-01

{
  "settlements": [
    {
      "disbursementAmount": 23.5000,
      "transactionId": 1,
      "uniqueReferenced": "43256",
      "disbursementMethod": "bpay",
      "feeAmountExclGst": 1.23,
      "feeAmountGstComponent": 0.123,
      "feeAmountInclGst": 1.353
    },
    {
      "disbursementAmount": 1.5000,
      "transactionId": 1,
      "uniqueReferenced": "43256",
      "disbursementMethod": "mAccount",
      "feeAmountExclGst": 0.35,
      "feeAmountGstComponent": 0.035,
      "feeAmountInclGst": 0.385
    }
  ],
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 42
}

```

```python

import requests
from requests.auth import HTTPBasicAuth

r = requests.get(BASE_URL + "/reports/v1/settlement/" + "2015-09-01", auth=HTTPBasicAuth(USER, PASS))
print(r)
```

```javascript
let rp = require('request-promise');

var options = {
  uri: BASE_URL + "/reports/v1/settlement/" + "2015-09-01",
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
	"settlements":			[
								SettlementItem
							],
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number
}
```

This report returns an array of actual disbursements for each transaction that was settled on the given date. Date is represented by ISO8601 – ‘2016-03-01’ for 1st March 2016.


The Platform settles transactions at 4pm (Sydney time) each business day. Therefore, transactions on weekends, public holidays and after 4pm won’t appear in the settlement report until after 4pm the next business day. 


### HTTP Request

`GET BASE_URL + /reports/v1/settlement/{date}`

### Request Parameter Fields

Field Name | Description
---- | ----
date | The settlement date you want reported. Format is ISO8601


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
settlements | [SettlementItem] | An array of SettlementItem’s
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Statement

```shell
# Date follows ISO8601 yyyy-mm-dd format
my-machine$ curl -u USER:PASS BASE_URL/reports/v1/statement/2015-09-01

{
  "transactions": [
    {
      "dateTime": "2015-09-01T13:32:20",
      "feeAmountExcludingGst": 0.3350,
      "feeAmountGstComponent": 0.0335,
      "feeAmountIncludingGst": 0.3685,
      "totalAmount": 25.00,
      "transactionId": 20,
      "uniqueReferenced": "43256"
    },
    {
      "dateTime": "2015-09-01T19:19:38",
      "feeAmountExcludingGst": 0.3350,
      "feeAmountGstComponent": 0.0335,
      "feeAmountIncludingGst": 0.3685,
      "totalAmount": 25.00,
      "transactionId": 36,
      "uniqueReferenced": "43257"
    }
  ],
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 47
}
```

```python

import requests
from requests.auth import HTTPBasicAuth

r = requests.get(BASE_URL + "/reports/v1/statement/" + "2015-09-01", auth=HTTPBasicAuth(USER, PASS))
print(r)
```

```javascript
let rp = require('request-promise');

var options = {
  uri: BASE_URL + "/reports/v1/statement/" + "2015-09-01",
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
	"transactions":			[
								TransactionItem
							],
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number
}
```

This API returns all successful transactions on the given date. Date is represented by ISO8601 – ‘2016-03-01’ for 1st March 2016.


### HTTP Request

`GET BASE_URL + /reports/v1/statement/{date}`

### Request Parameter Fields

Field Name | Description
---- | ----
date | The settlement date you want reported. Format is ISO8601


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
settlements | [SettlementItem] | An array of SettlementItem’s
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Status Codes and Descriptions

Status Code	| Description |HTTP Status
---- | --------| ---------
Ok | Call has succeeded. | 200
Unauthorized | Authentication Failure | 401
Error | Exception has occurred. | 400
RequestBodyNotvalidJSON | The request body was not valid JSON | 400
IncorrectDateFormat | Incorrect date format. Format example is '10September2015' or '10Sep2015' | 400


