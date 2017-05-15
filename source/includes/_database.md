# Database
## Objects
### DatabaseSearchResultItem

> Schema for this object


```json
{
  "accountNumber":  string,
  "key":            string,
  "tag":            string,
  "recordId":       number,
  "data":           string
}
```


Provides comprehensive biller information that may be required for further complex validation.

Field Name|Type | Description
----|---|------
*accountNumber | string | This is the first part of the key that was set when the record was added using database/v1/add
*key | string | This is the second part of the key that was set when the record was added using database/v1/add
*tag | string | This is the third part of the key that was set when the record was added using database/v1/add
recordId | number | This is the unique row Id that was assigned to the row when the record was added using database/v1/add
data | string | This is the data that was set with the database/v1/add or database/v1/update APIs.  Could be null because the data is null in the User Database, or because the search property includeData = false


*Primary Key

## Add

```shell
# add with bare minimum payload.
my-machine$ curl -u USER:PASS -H "Content-Type: application/json" -X POST -d '{"accountNumber": null, "key": null, "tag": null,"data": "{\"lastTransactionId\": 1234567}"}' BASE_URL/database/v1/add

{
  "recordId": 29,
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 63
}

```

```python
import requests
from requests.auth import HTTPBasicAuth

data = {"accountNumber": None, "key": None, "tag": None,"data": "{\"lastTransactionId\": 1234567}"}
r = requests.post(BASE_URL + "/database/v1/add", data=data, auth=HTTPBasicAuth(USER, PASS))
print(r)
```

```javascript
let rp = require('request-promise');

var options = {
  method: "POST",
  uri: BASE_URL + "/database/v1/add",
  headers: {
    'Authorization': 'Basic ' + new Buffer(USER + ':' + PASS).toString('base64')
  },
  body: {
    "accountNumber": null,
    "key": null,
    "tag": null,
    "data": "{\"lastTransactionId\": 1234567}"
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

> The above command expects a JSON payload structured like this:

```json
{
  "accountNumber": string,
  "key":           string,
  "tag":           string,
  "data":          string
}
```

> The above command returns JSON structured like this:

```json
{
  "recordId":          number,
  "status":            string,
  "statusDescription": string,
  "durationMs":        number
}
```

This purpose of this API is to insert a new record into the User Database.

### HTTP Request

`POST BASE_URL + /database/v1/add`


### Body Request Field Descriptions

Field Name | Type | Max. Size | Description
---------- | ----- | ------------- | -----
\*accountNumber | string | 127 | This is the first part of the key. Can be any value you want. **If you pass in a null value it will be converted to an empty string**
\*key | string | 127 | This is the second part of the key. Can be any value you want. **If you pass in a null value it will be converted to an empty string**
\*tag | string | 127 | This is the third part of the key. Can be any value you want. **If you pass in a null value it will be converted to an empty string**
data | string | 127 | This is the user data to be encrypted and stored. Null is a valid value

\* makes up the primary key


### Response Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
recordId | number | This is the unique row Id that was assigned to your new row. It may be used in either the database/ v1/get and database/v1/delete APIs
status | string | This is the status of executing the BPAY request. A code of ‘Ok’ indicates no errors. See the section Status & Descriptions
statusDescription | string | This is a plain English description of the status
durationMs | number | This can be ignored. This value represents the total time in milliseconds that the Platform took to process the request


## Delete

```shell
# delete a row that was previously added which returned a recordId equal to 30
my-machine$ curl -u USER:PASS -X DELETE BASE_URL/database/v1/delete/30

{
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 63
}

```

```python

import requests
from requests.auth import HTTPBasicAuth

# delete a row that was previously added which returned a recordId equal to 30
r = requests.delete(BASE_URL + "/database/v1/delete/" + "30", auth=HTTPBasicAuth(USER, PASS))
print(r)
```

```javascript
let rp = require('request-promise');

// delete a row that was previously added which returned a recordId equal to 30
var options = {
  method: "DELETE",
  uri: BASE_URL + "/database/v1/delete/" + "30",
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
  "status":            string,
  "statusDescription": string,
  "durationMs":        number
}
```

This purpose of this API is to delete a record in the User Database.


The recordId is returned from the database/v1/add and database/v1/search APIs

### HTTP Request

`DELETE BASE_URL + /database/v1/delete/{recordId}`


### Parameter Descriptions ###

Field Name  | Description
---------- | ----------
recordId  | This is the user data to be encrypted and stored. Null is a valid value


### Response Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
status | string | This is the status of executing the BPAY request. A code of ‘Ok’ indicates no errors. See the section Status & Descriptions
statusDescription | string | This is a plain English description of the status
durationMs | number | This can be ignored. This value represents the total time in milliseconds that the Platform took to process the request


## Get

```shell
# retrieve a row that was previously added which returned a recordId of 30
my-machine$ curl -u USER:PASS BASE_URL/database/v1/get/30

{
  "accountNumber": "12345",
  "key": " Transaction Result",
  "tag": " Result:Ok",
  "data": "{\"durationMs\":93,\"status\":\"Ok\",\"statusDescription\":\"Operation completed successfully\",\"bpayReceipts\":[],\"callerUniqueReference\" :\"12345\",\"feeAmountExcludingGst\":1.7500,\"feeAmountGstComponent\":           0.175,\"feeAmountIncludingGst\":1.925,\"feeBreakdown\": {   \"debitFee\": {  \"feeAmountExcludingGst\":1.0,\"feeAmountGstComponent\": 0.1,    \"feeAmountIncludingGst\": 1.1},    \"disbursementFees\": [{\"disbursementArrayIndex\": 0,\"disbursementFee\":{ \"feeAmountExcludingGst\"  :0.75,\"feeAmountGstComponent\":0.075,\"feeAmountIncludingGst\":0.825}}]},\"transactionId\":3}",
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 76
}

```

```python

import requests
from requests.auth import HTTPBasicAuth

# retrieve a row that was previously added which returned a recordId of 30
r = requests.get(BASE_URL + "/database/v1/get/" + "30", auth=HTTPBasicAuth(USER, PASS))
print(r)
```

```javascript
let rp = require('request-promise');

// retrieve a row that was previously added which returned a recordId of 30
var options = {
  method: "GET",
  uri: BASE_URL + "/database/v1/get/" + "30",
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
  "accountNumber":     string,
  "key":               string,
  "tag":               string,
  "data":              string,
  "status":            string,
  "statusDescription": string,
  "durationMs":        number
}
```

This purpose of this API is to retrieve a record from the User Database.

### HTTP Request

`GET BASE_URL + /database/v1/get/{recordId}`


### Parameter Descriptions ###

Field Name  | Description
---------- | ----------
recordId  | The unique row Id of the row to retrieve, returned by database/v1/add and database/v1/search APIs


### Response Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
accountNumber | string | This is the first part of the key used to store the user data. Could be null
key | string | This is the second part of the key used to store the user data. Could be null
tag | string | This is the third part of the key used to store the user data. Could be null
data | string | This is the user data that has been retireved. Could be null
status | string | This is the status of executing the GET request. A code of ‘Ok’ indicates no errors. See the section Status & Descriptions
statusDescription | string | This is a plain English description of the status
durationMs | number | This can be ignored. This value represents the total time in milliseconds that the Platform took to process the request


## Search

```shell
# Return all rows not including the data column
my-machine$ curl -u USER:PASS -H "Content-Type: application/json" -X POST -d '{  "accountNumber": null,"key": null,"tag": null,"isAccountNumberRegularExpression": false,"isKeyRegularExpression": false,"isTagRegularExpression":false,"includeData": false}' BASE_URL/database/v1/search

{
  "results": [
        {
          "accountNumber" : "",
          "key": "",
          "tag": "",
          "recordId": 29,
          "data": null},
        {
          "accountNumber": "1234567890",
          "key": "Sales Order Details",
          "tag": "Inv#20161228-0001",
          "recordId": 23,
          "data": null},
        {
          "accountNumber": "1234567891",
          "key": "Sales Order Details",
          "tag": "Inv#20161228-0002",
          "recordId": 24,
          "data": null
        },
        {
          "accountNumber": "1234567891",
          "key"   : "Sales Order Details",
          "tag"   : "Inv#20161229-0001",
          "recordId"  : 25,
          "data"    : null
        },
        {
          "accountNumber": "1234567892",
          "key": "Sales Order Details",
          "tag": "Inv#20161229-0002",
          "recordId": 26,
          "data": null
        },
        {
          "accountNumber": "1234567893",
          "key": "Sales Order Details",
          "tag": "Inv#20161229-0003",
          "recordId": 27,
          "data": null
        },
        {
          "accountNumber": "1234567893",
          "key": "Sales Refund Details",
          "tag": "Inv#20161230-0001",
          "recordId": 28,
          "data": null
        },
        {
          "accountNumber": "1234567893",
          "key": "Transaction Result",
          "tag": "Result:Ok",
          "recordId": 31,
          "data": null
        }
          ],
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 89
}
```

```python

import requests
from requests.auth import HTTPBasicAuth

# Return all rows not including the data column
allRows = {
  "accountNumber": null,
  "key": null,
  "tag": null,
  "isAccountNumberRegularExpression": false,
  "isKeyRegularExpression": false,
  "isTagRegularExpression": false,
  "includeData": false
};

# Return the row (including data) where the accountNumber, key and tag are all empty. 
# Setting the values to empty is different than setting the key parts to null. 
# In this case we want the data associated to the recored where all key parts are empty strings.
emptyRows = {
  "accountNumber": "",
  "key": "",
  "tag": "",
  "isAccountNumberRegularExpression": false,
  "isKeyRegularExpression": false,
  "isTagRegularExpression": false,
  "includeData": true
};

# Return the first Sales Order for each day, without data.
firstSalesOrder = {
  "accountNumber": null,
  "key": "^Sales Order",
  "tag": "-0001$",
  "isAccountNumberRegularExpression": false,
  "isKeyRegularExpression": true,
  "isTagRegularExpression": true,
  "includeData": false
};

# Return the first Sales Order for accountNumber 1234567891.
firstSalesOrderForSomeAcc = {
  "accountNumber": "1234567891",
  "key": "^Sales Order",
  "tag": "-0001$",
  "isAccountNumberRegularExpression": false,
  "isKeyRegularExpression": true,
  "isTagRegularExpression": true,
  "includeData": false
};


r = requests.get(BASE_URL + "/database/v1/search", data=emptyRows, auth=HTTPBasicAuth(USER, PASS))
print(r)
```

```javascript
let rp = require('request-promise');

// Return all rows not including the data column
let allRows = {
  "accountNumber": null,
  "key": null,
  "tag": null,
  "isAccountNumberRegularExpression": false,
  "isKeyRegularExpression": false,
  "isTagRegularExpression": false,
  "includeData": false
};

// Return the row (including data) where the accountNumber, key and tag are all empty. 
// Setting the values to empty is different than setting the key parts to null. 
//In this case we want the data associated to the recored where all key parts are empty strings.
let emptyRows = {
  "accountNumber": "",
  "key": "",
  "tag": "",
  "isAccountNumberRegularExpression": false,
  "isKeyRegularExpression": false,
  "isTagRegularExpression": false,
  "includeData": true
};

// Return the first Sales Order for each day, without data.
let firstSalesOrder = {
  "accountNumber": null,
  "key": "^Sales Order",
  "tag": "-0001$",
  "isAccountNumberRegularExpression": false,
  "isKeyRegularExpression": true,
  "isTagRegularExpression": true,
  "includeData": false
};

// Return the first Sales Order for accountNumber 1234567891.
let firstSalesOrderForSomeAcc = {
  "accountNumber": "1234567891",
  "key": "^Sales Order",
  "tag": "-0001$",
  "isAccountNumberRegularExpression": false,
  "isKeyRegularExpression": true,
  "isTagRegularExpression": true,
  "includeData": false
};


var options = {
  method: "POST",
  uri: BASE_URL + "/database/v1/search",
  headers: {
    'Authorization': 'Basic ' + new Buffer(USER + ':' + PASS).toString('base64')
  },
  body: emptyRows,
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
  "accountNumber":                    string,
  "key":                              string,
  "tag":                              string,
  "isAccountNumberRegularExpression": boolean,
  "isKeyRegularExpression":           boolean,
  "isTagRegularExpression":           boolean,
  "includeData":                      boolean
} 
```

> The above command returns JSON structured like this:

```json
{
  "accountNumber":     string,
  "key":               string,
  "tag":               string,
  "data":              string,
  "status":            string,
  "statusDescription": string,
  "durationMs":        number
}
```

This purpose of this API is to retrieve a record from the User Database.

### HTTP Request

`POST BASE_URL + /database/v1/search`


### Parameter Descriptions ###

Field Name  | Description
---------- | ----------
\*accountNumber | string | null | This is the first part of the key to search for. **If null, key part is not selected**
\*key | string | null | This is the first part of the key to search for. **If null, key part is not selected**
\*tag | string | null | This is the first part of the key to search for. **If null, key part is not selected**
isAccountNumberRegularExpression | boolean | false | Set to true if the accountNumber field contains a Regular Expression
isKeyRegularExpression | boolean | false | Set to true if the key field contains a Regular Expression
isTagRegularExpression | boolean | false | Set to true if the accountNumber field contains a Regular Expression
includeData | boolean | false | Set to true if the accountNumber field contains a Regular Expression

### Response Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
results | [DatabaseSearchResultItem] | See DatabaseSearchResultItem class
status | string | This is the status of executing the GET request. A code of ‘Ok’ indicates no errors. See the section Status & Descriptions
statusDescription | string | This is a plain English description of the status
durationMs | number | This can be ignored. This value represents the total time in milliseconds that the Platform took to process the request


## Update

```shell
# update a row that was previously added which returned a recordId of 29
my-machine$ curl -u USER:PASS -H "Content-Type: application/json" -X POST -d '{"recordId": 29,"data": "{\"lastTransactionId\":1234568}"}' BASE_URL/database/v1/update

{
  "status": "Ok",
  "statusDescription": "Operation completed successfully",
  "durationMs": 52
}
```

```python

import requests
from requests.auth import HTTPBasicAuth

# update a row that was previously added which returned a recordId of 29
data = {
  "recordId": 29,
  "data": "{\"lastTransactionId\":1234568}"
};


r = requests.post(BASE_URL + "/database/v1/update", data=data, auth=HTTPBasicAuth(USER, PASS))
print(r)
```

```javascript
let rp = require('request-promise');

// update a row that was previously added which returned a recordId of 29
let data = {
  "recordId": 29,
  "data": "{\"lastTransactionId\":1234568}"
};


var options = {
  method: "POST",
  uri: BASE_URL + "/database/v1/update",
  headers: {
    'Authorization': 'Basic ' + new Buffer(USER + ':' + PASS).toString('base64')
  },
  body: data,
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
  "recordId": number,
  "data":     string
} 
```

> The above command returns JSON structured like this:

```json
{
  "status":            string,
  "statusDescription": string,
  "durationMs":        number
}
```

This purpose of this API is to retrieve a record from the User Database.

### HTTP Request

`POST BASE_URL + /database/v1/update`


###  Descriptions ###

Field Name | Type | Description
---------- |------|----------
recordId | number | This is the unique record Id that represents the row to be updated
data | string  | The data to be written into the row represented by recordId. A null value is allowed. A new SALT is generated for the row.

### Response Field Descriptions

Field Name | Type | Description
--------- | ------- | -----------
status | string | This is the status of executing the GET request. A code of ‘Ok’ indicates no errors. See the section Status & Descriptions
statusDescription | string | This is a plain English description of the status
durationMs | number | This can be ignored. This value represents the total time in milliseconds that the Platform took to process the request


## Status Codes and Descriptions

Status Code | Description | HTTP Status
------------|-------------|------------
Ok | Validation has passed|200
Unauthorized | Authentication Failure | 401
Error | An unknown processing error occurred. Transaction has been cancelled | 400
RequestBodyNotValidJson | The request body was not valid JSON | 400
RecordIdNotFound | The recordId was not found | 400
DuplicateKey | An error occurred adding the data. Most likely a duplicate key | 400
AccountNumberKeyExceedsMaximumLength | accountNumber key value exceeds maximum length of 127 characters | 400
KeyExceedsMaximumLength | key key value exceeds maximum length of 127 characters | 400
TagExceedsMaximumLength | tag key value exceeds maximum length of 127 characters | 400
