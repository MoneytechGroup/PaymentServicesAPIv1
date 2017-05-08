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

`POST http://example.com/database/v1/add`


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

`DELETE http://example.com/database/v1/delete/{recordId}`


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

`GET http://example.com/database/v1/get/{recordId}`


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

`POST http://example.com/database/v1/search`


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

`POST http://example.com/database/v1/update`


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


## Database Status and Description

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
