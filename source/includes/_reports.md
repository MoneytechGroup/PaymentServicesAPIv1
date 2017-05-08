# Reports
## Settlement

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

`GET http://example.com/reports/v1/settlement/{date}`

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

`GET http://example.com/reports/v1/statement/{date}`

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


## Status and Description

Status Code	| Description |HTTP Status
---- | --------| ---------
Ok | Call has succeeded. | 200
Unauthorized | Authentication Failure | 401
Error | Exception has occurred. | 400
RequestBodyNotvalidJSON | The request body was not valid JSON | 400
IncorrectDateFormat | Incorrect date format. Format example is '10September2015' or '10Sep2015' | 400


