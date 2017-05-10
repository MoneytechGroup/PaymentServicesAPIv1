# Financial

## Overview

The financial APIs provide the core financial functionality such as refunds, transactions and status.


You may Debit one of the following sources:


  * mWallet
  * mAccount
  * Australian Bank Account
  * Credit-Card (Refunds are supported, including partial)
  
  
You may Crebit one of the following sources:


  * mWallet
  * mAccount
  * Australian Bank Account
  * BPay
  
## Objects
### AustralianBankAccount
> Schema for this object


```json
{
  "bsbNumber":      string,
  "accountNumber":  string,
  "accountName":    string
}
```


Provides comprehensive biller information that may be required for further complex validation.

Field Name|Type|Max Size | Description
----|---|---|----
*bsbNumber|string | 7 | This is the Bank-State-Branch number. Format is 3-3 digits. Eg.’ 000-000’
*accountNumber | string | 9 | This is the bank accounts number. Minimum length is 4
*accountName | string | 32 | This is the name of the account. Minimum length is 5

*Required Field

### BpayDetails
> Schema for this object


```json
{
  "billerCode":       number,
  "referenceNumber":  string
}
```

Provides details of an Australian Bank Account (ABA). An Australian Bank Account can be used for Debit or Credit transactions.

Field Name|Type|Max Size | Description
----|---|---|----
*billerCode | number |  | This is the BPAY Biller Code
*referenceNumber |  string | 20 | This is the BPAY Reference Number. It’s really a number although leading ‘0’ are significant.

*Required Field

### BpayDisbursementItem
> Schema for this object


```json
{
  "disbursementMethod": string,
  "amount":             number,
  "description":        string,
  "toBpayDetails":      BpayDetails
}

```

Provides payment details for a disbursement to a BPAY biller.

Field Name|Type|Max Size | Description
----|---|---|----
*disbursementMethod| string| |   This must be  "bpay"
*amount |number| |   This is the amount of funds to be paid
description |string| 500| An optional description of the disbursement item
*toBpayDetails | BpayDetails| |  See BpayDetails class

*Required Field

### BpayReceiptItem
> Schema for this object

```json
{
  "receiptNumber":    number,
  "billerCode":       number,
  "referenceNumber":  string,
  "amount":           number
}
```

Contains a BPAY receipt number and details for each BPAY disbursement. An array of these items is returned from the Execute API for each BPAY disbursement.

Field Name|Type | Description
----|---|-------
receiptNumber | number | This is the unique receipt number issue by the Platform for the BPAY transaction.
billerCode |  number | This is the BPAY Biller Code
referenceNumber | string | This is the BPAY Reference Number
amount |  number | The amount that was disbursed


### CreditCardDetails
> Schema for this object

```json
{
  "nameOnCard":           string,
  "cardNumber":           string,
  "expiryMonth":          number,
  "expiryYear":           number,
  "cardValidationNumber": string
}
```

Provides details about the Credit-Card to be debited from.

Field Name|Type |Max Size | Description
----|---|---|----
*nameOnCard | string | 100| This is the name on the Credit-Card. 
*cardNumber | string | 16|  This is the Credit-Cards number. This field must be numeric only.
*expiryMonth |  number |  | This is the expiry month of the Credit-Card. Must be between 1 and 12
*expiryYear | number |  | This is the expiry year of the Credit-Card. Can be either a 2 or 4 digit year
*cardValidationNumber | string | 4| This is the Credit-Cards validation number. Must be a 4 or 3 digit number depending on the card type.
*Required Field

### DirectCreditDisbursementItem
> Schema for this object

```json
{
  "disbursementMethod":   string,
  "amount":               number,
  "description":          string,
  "toDirectCreditDetails": AustralianBankAccount
}
```

Provides payment details for a disbursement to an Australian Bank Account.

Field Name|Type | Description
----|---|-------
*disbursementMethod| string | | This must be  "directCredit"
*amount | number | | This is the amount of funds to be paid
description | string | 500 | An optional description of the disbursement item
*toDirectCreditDetails | AustralianBankAccount | | See AustralianBankAccount class
*Required Field

### DisbursementFeeItem
> Schema for this object

```json
{
  "disbursementArrayIndex": number,
  "disbursementFee":        FeeDetailItem
}

```

Contains detailed fee information for each disbursement

Field Name|Type | Description
----|---|-------
disbursementArrayIndex | number | This is the index into the Disbursement array that was passed to either financials/v1/transaction/validate or financials/v1/transaction/execute
disbursementFee | FeeDetailItem | This is the fee details applied to the disbursement at index disbursementArrayIndex. See FeeDetailItem section.

### FeeBreakdownDetail
> Schema for this object

```json
{
  "debitFee":         FeeDetailItem,
  "disbursementFees": [
                        DisbursementFeeItem
                      ]
}
```

Returned in both the financials/v1/transaction/validate and financials/v1/transaction/execute APIs it contains details of the fees charged against the Sign-In Account.

Field Name|Type | Description
----|---|-------
debitFee | FeeDetailItem | Returns the fee details for the Debit transaction. See FeeDetailItem section
disbursementFees | [DisbursementFeeItem] | Returns an arrao for disbursementFee, which is the fee details for each disbursement. See DisbursementFeeItem section.

### FeeDetailItem
> Schema for this object

```json
{
  "feeAmountExcludingGst": number,
  "feeAmountGstComponent": number,
  "feeAmountIncludingGst": number
}
```

Contains the breakdown of an individual fee into three parts:

 - Fee amount excluding GST
 - GST component
 - Fee amount including GST

All three fee amounts are accurate to 4 decimal places.


Field Name|Type | Description
----|---|-------
feeAmountExcludingGst | number | The fee amount excluding GST
feeAmountGstComponent | number | The GST component of the fee
feeAmountIncludingGst | number | The fee amount including GST

### MAccountDetails
> Schema for this object

```json
{
  "token": string
}
```

Provides details about the mAccount you wish to move funds from or through. 


**Note:**


Another structure called mAccountDetails exists in the mAccount/v1 API to retrieve extended details of the mAccount and this should not be confused by this structure which is used only in the financial/v1 APIs.


Field Name|Type | Max Size| Description
----|---|----|---
*token | number | 16 | mAccount 16-Digit account number
*Required Field

### MAccountDisbursementItem
> Schema for this object

```json
{
  "disbursementMethod": string,
  "amount":             number,
  "description":        string,
  "toMAccount":         string
}
```

Provides payment details for a disbursement to an existing mAccount.


Field Name|Type | Max Size| Description
----|---|---|----
*disbursementMethod | string | |  This must be "mAccount"
*amount | number |  | This is the amount of funds to be paid
description | string | 500 | An optional description of the disbursement item
*toMAccount | string |  | This is the 16-Digit account number representing the mAccount
*Required Field

### MWalletDetails
> Schema for this object

```json
{
  "token":  string,
  "pin":    string
}
```

Provides details about the mWallet you wish to move funds from or through.


Field Name|Type | Max Size| Description
----|---|---|----
*token | number | 16 | mWallet 16-Digit account number
*pin | string | 4 | PIN number. A 4 digit number where leading ‘0’ are significant.
*Required Field

### MWalletDisbursementItem
> Schema for this object

```json
{
  "disbursementMethod": string,
  "amount":             number,
  "description":        number,
  "toMWallet":          string
}
```

Provides payment details for a disbursement to an existing mWallet.


Field Name|Type | Max Size| Description
----|---|---|----
*disbursementMethod | string | |  This must be  "mWallet"
*amount | number | | This is the amount of funds to be paid
description | string | 500 | An optional description of the disbursement item
*toMWallet | string | 16 | This is the 16-Digit account number representing the mWallet
*Required Field


### TokenDisbursementItem
> Schema for this object

```json
{
  "disbursementMethod": string,
  "amount":             number,
  "description":        number,
  "toToken":            string
}
```

Provides payment details for a previously registered token.


Field Name|Type | Max Size| Description
----|---|---|----
*disbursementMethod | string | |  This must be  mWallet
*amount | number | | This is the amount of funds to be paid
description | string | 500 | An optional description of the disbursement item
*toToken | string | 36 | Token that was returned by the token/v1 services
*Required Field

## Refund - Execute

> The above command returns JSON structured like this:

```json
{
  "transactionId":         number,
  "callerUniqueReference": string,
  "feeAmountExcludingGst": number,
  "feeAmountGstComponent": number,
  "feeAmountIncludingGst": number,
  "status":                string,
  "statusDescription":     string,
  "durationMs":            number
}
```

The purpose of the financial/v1/refund/execute API is to refund funds back on a Credit-Card that was used in a previousfinancial/v1/transaction/execute API call.


Funds are debited from the Sign-In mAccount then refunded back to the Credit-Card. It is your responsibility to ensure there are sufficient funds in your mAccount.

### HTTP Request

`POST BASE_URL + /financial/v1/refund/execute`

### Field Descriptions

Field Name | Type | Max Size | Description
--------- | ------- | ------ | -----------
\*uniqueReference | string | 200 | This is a unique reference generated by the calling service. This is a NONCE. Its use is to determine if a request has already been received by thePlatform.
printUniqueReferenceOnStatement | boolean | | If true, the UniqueReference will be printed on the statement. Default is false;
\*refundAmount | number | | This is the amount to be debited from the Sign-in mAccout then credited to the Credit-Card used in the original transaction
\*description | string | 500 | This description will be displayed on themWallet and mAccount statements. It  should be brief but contain sufficient information to identify the goods. E.g. "Flowers Refund. Inv#: 123456".
\*originalTransactionId | number | | This is the transactionId that was returned from the original Credit-Card transaction.

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
transactionId|number|This is the Platform ID that is unique to your refund request. 0 will be returned if any errors occurred. If theuniqueReference already exists, then this field will contain the previous transactionId, which could be 0.
callerUniqueReference | string | This is the unique reference that was passed in by the calling service
feeAmountExcludingGst | number | This is the fee amount Excluding GST that has been debited from your mAccount account
feeAmountGstComponent | number | This is the GST Component of the fee amount that has been debited from your mAccount
feeAmountIncludingGst | number | This is the total fee amount Including GST that has been debited from your mAccount
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Refund - Validate

> The above command returns JSON structured like this:

```json
{
  "transactionId":         number,
  "callerUniqueReference": string,
  "feeAmountExcludingGst": number,
  "feeAmountGstComponent": number,
  "feeAmountIncludingGst": number,
  "status":                string,
  "statusDescription":     string,
  "durationMs":            number
}
```


The purpose of the refund/validate API is to determine if the parameters for the refund/execute API are correct. This API is optional although it does return the fees that will be returned.


### HTTP Request

`POST BASE_URL + /financial/v1/refund/validate`

### Request Body Field Descriptions

Field Name | Type | Max Size | Description
--------- | ------- | ------ | -----------
\*uniqueReference | string | 200 | This is a unique reference generated by the calling service. This is a NONCE. Its use is to determine if a request has already been received by thePlatform.
printUniqueReferenceOnStatement | boolean | | If true, the UniqueReference will be printed on the statement. Default is false;
\*refundAmount | number | | This is the amount to be debited from the Sign-in mAccout then credited to the Credit-Card used in the original transaction
\*description | string | 500 | This description will be displayed on themWallet and mAccount statements. It  should be brief but contain sufficient information to identify the goods. E.g. "Flowers Refund. Inv#: 123456".
\*originalTransactionId | number | | This is the transactionId that was returned from the original Credit-Card transaction.

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
transactionId|number|This is the Platform ID that is unique to your refund request. 0 will be returned if any errors occurred. If theuniqueReference already exists, then this field will contain the previous transactionId, which could be 0.
callerUniqueReference | string | This is the unique reference that was passed in by the calling service
feeAmountExcludingGst | number | This is the fee amount Excluding GST that has been debited from your mAccount account
feeAmountGstComponent | number | This is the GST Component of the fee amount that has been debited from your mAccount
feeAmountIncludingGst | number | This is the total fee amount Including GST that has been debited from your mAccount
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Status

> The above command returns JSON structured like this:

```json
{
  "dishonouredDate":   string,
  "transactionStatus": string
  "status":            string,
  "statusDescription": string,
  "durationMs":        number
}
```

Returns the status of a previous transaction; this is important because a directDebit transaction may be dishonoured up to 10 days after the transaction was executed.


See the section Callback Notification for a discussion on being notified when a directDebit transaction is dishonoured.

### HTTP Request

`GET BASE_URL + /financial/v1/status/{uniqueReference}`

### Request Parameters

Title | Description
---------- | ---------
uniqueReference | The unique reference provided by a successful execution of a financial transaction


## Transaction - Execute

> The above command returns JSON structured like this:

```json
{
  "transactionId":         number,
  "callerUniqueReference": string,
  "feeAmountExcludingGst": number,
  "feeAmountGstComponent": number,
  "feeAmountIncludingGst": number,
  "bpayReceipts":          [BpayReceiptItem],
  "feeBreakdown":          FeeBreakdownDetail,
  "status":                string,
  "statusDescription":     string,
  "durationMs":            number
}
```


The purpose of the execute API is to debit a source for funds then distribute those funds to one or more supplied disbursement accounts. 


You can use the Transaction/validate API to determine if the parameters are correct.


### HTTP Request

`POST BASE_URL + /financial/v1/transaction/execute`

### Request Body Schema

```json
{
  "uniqueReference":                 string, 
  "printUniqueReferenceOnStatement": boolean,
  "totalAmount":                     number,
  "description":                     string,
  "paymentSource":                   string,
  "token":                           string,
  "creditCard":                      CreditCardDetails,
  "mWallet":                         MWalletDetails,
  "mAccount":                        MAccountDetails,
  "directDebit":                     AustralianBankAccount,
  "midToken":                        string,
  "ignoreCardTypes":                 [string],
  "disbursements":                   [
                                       MAccountDisbursementItem,
                                       DirectCreditDisbursementItem,
                                       BpayDisbursementItem,
                                       TokenDisbursementItem
                                     ]
}
```


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
transactionId|number|This is the Platform ID that is unique to your refund request. 0 will be returned if any errors occurred. If theuniqueReference already exists, then this field will contain the previous transactionId, which could be 0.
callerUniqueReference | string | This is the unique reference that was passed in by the calling service
feeAmountExcludingGst | number | This is the fee amount Excluding GST that has been debited from your mAccount account
feeAmountGstComponent | number | This is the GST Component of the fee amount that has been debited from your mAccount
feeAmountIncludingGst | number | This is the total fee amount Including GST that has been debited from your mAccount
bpayReceipts | [BpayReceiptItem] | An array of BpayReceiptItem’s. Each BPAY disbursement will have an entry in this array with the unique receipt number. See the BpayReceiptItem section
feeBreakdown | FeeBreakdownDetail | Contains details fees for the Debit transaction and each disbursement.See the FeeBreakdownDetail section
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Transaction - Validate

> The above command returns JSON structured like this:

```json
{
  "transactionId":         number,
  "callerUniqueReference": string,
  "feeAmountExcludingGst": number,
  "feeAmountGstComponent": number,
  "feeAmountIncludingGst": number,
  "status":                string,
  "statusDescription":     string,
  "durationMs":            number
}
```


The purpose of the execute API is to debit a source for funds then distribute those funds to one or more supplied disbursement accounts. 


You can use the Transaction/validate API to determine if the parameters are correct.


### HTTP Request

`POST BASE_URL + /financial/v1/transaction/execute`

### Request Body Schema

```json
{
  "uniqueReference":                 string, 
  "printUniqueReferenceOnStatement": boolean,
  "totalAmount":                     number,
  "description":                     string,
  "paymentSource":                   string,
  "token":                           string,
  "creditCard":                      CreditCardDetails,
  "mWallet":                         MWalletDetails,
  "mAccount":                        MAccountDetails,
  "directDebit":                     AustralianBankAccount,
  "midToken":                        string,
  "ignoreCardTypes":                 [string],
  "disbursements":                   [
                                       MAccountDisbursementItem,
                                       DirectCreditDisbursementItem,
                                       BpayDisbursementItem,
                                       TokenDisbursementItem
                                     ]
}
```


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
transactionId|number|This is the Platform ID that is unique to your refund request. 0 will be returned if any errors occurred. If theuniqueReference already exists, then this field will contain the previous transactionId, which could be 0.
callerUniqueReference | string | This is the unique reference that was passed in by the calling service
feeAmountExcludingGst | number | This is the fee amount Excluding GST that has been debited from your mAccount account
feeAmountGstComponent | number | This is the GST Component of the fee amount that has been debited from your mAccount
feeAmountIncludingGst | number | This is the total fee amount Including GST that has been debited from your mAccount
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Status Codes and Descriptions

This section documents the returned status codes for bothtransaction and refund APIs along with the default descriptions. Descriptions may not match exactly as in many cases the invalid value will be returned as part of the description. If the description contains an array[‘]’ the returned description will contain the actual index containing the error eg. ‘[2]’


### Transactions

Status Code | Description | HTTP Status
---------------| ----------| ----------
Ok|Operation completed successfully | 200
Unauthorized|Authentication Failure 401
Error| An unknown processing error occurred. Transaction has been cancelled | 400 
Exception | An unhandled Exception has occurred. Transaction has been cancelled | 400 
UniqueIdNotFound | The Unique ID was not found | 400 
RequestBodyNotValidJson | The request body was not valid JSON | 400 
UniqueReferenceExists | The uniqueReference already exists | 400 
UniqueReferenceExceedsMaxLength | The uniqueReference must not exceed 200 characters in length | 400 
InvalidTotalAmount | totalAmount must be greater than $0.00 and must be no more than two decimal places | 400 
InvalidDisbusrsmentAmount | disbursements[].amount must be greater than $0.00 and must be no more than two decimal places | 400
InvalidDescription | description must not be empty or null | 400
InvalidDescription |Maximum length of description is 300 characters | 400
InvalidDescriptionLength | disbursements[] collection must contain at least one item | 400 
InvalidDisbursementsCollection | disbursements[].amount must have a value greater than $0.00 | 400 
InvalidDisbursementItemAmount | When disbursements[].disbursementMethod equals 'mAccount' the toMAccount field must have a valid mAccount 16-Digit account number | 400
InvalidDisbursementItemToMAccount | When disbursements[].disbursementMethod equals 'mAccount' and the mAccount is a Chariy, the Charity must be a vvalid for your Sign-In Account | 400
InvalidDisbursementItemToMAccountInvalidCharity | "When disbursements[].disbursementMethod equals 'mWallet' the mWallet field must have a valid mWallet 16-Digit account number | 400
InvalidDisbursementItemDirectCreditDetails | When disbursements[].disbursementMethod equals 'directCredit' the item must have a valid toDirectCreditDetails | 400
InvalidAmountsDontMatch | Sum of the disbursements[].amounts does not equal the totalAmount | 400 
ToAccountNotValidToTransact | The disbursements[].toMAccount is not valid to transact | 400
ToAccountNotValidToTransact |The disbursements[].toMAccount is not valid to transact | 400
ToMWalletNotValidToTransact |The disbursements[].toMWallet is not valid to transact  | 400
ToMWalletNotFound |The disbursements[].toMWallet number not found  | 400
MAccountMustNotBeNull |mAccount must not be null | 400
MAccountTokenMustNotBeEmpty |mAccount.token must not be null or empty  | 400
PaymentSourceMustNotBeEmpty |paymentSource must not be empty | 400
InvalidPaymentSource | paymentSource has an invalid value  | 400
InvalidDisbursementMethod |disbursements[].disbursementMethod has an invalid value. Only 'mAccount', 'mWallet', 'directCredit', 'BPAY' and 'Token' are valid values  | 400
InvalidCreditCardDetails | creditCardDetails must not be null when paymentMethod is 'creditCard' | 400
InvalidCreditCardNameOnCard |creditCardDetails.nameOnCard must not be null or empty | 400
InvalidCreditCardCardNumber |creditCardDetails.cardNumber is invalid. Card number must be a valid Card number issued by 'Visa', 'Mastercard', 'Amex' or 'Diners' | 400
InvalidCreditCardExpiryMonth | creditCardDetails.expiryMonth is invalid  | 400
InvalidCreditCardExpiryYear | creditCardDetails.expiryYear is invalid | 400
InvalidCreditCardExpired |  creditCardDetails.Expired has expired | 400
InvalidCreditCardValidationNumber | creditCardDetails.cardValidationNumber must not be null or empty | 400
InvalidCreditCardValidationNumberLength3 |  creditCardDetails.cardValidationNumber must be 3 digits in length | 400
InvalidCreditCardValidationNumberLength4 |  creditCardDetails.cardValidationNumber must be 4 digits in length | 400
CreditCardTransactionFailed | The transaction was rejected by the payment gateway. Gateway response message: |  400
InvalidDisbursementItemDisbursementMethod | disbursements[].disbursementMethod has an invalid value. Only 'mAccount', 'directCredit', 'BPAY' and 'Token' are valid values | 400
UnknownCreditCardCardBinNumber |  The creditCardDetails.cardNumber's first 6 digits (called the BIN - Bank Identification Number) was not recognised by the Platform. Only Credit-Cards of type - 'Visa', 'Mastercard', 'Amex' and 'Diners' are supported | 400
InvalidCreditCardType | The creditCardDetails.cardNumber's first 6 digits (called the BIN - Bank Identification Number) represents a non supported brand. Only'Visa', 'Mastercard', 'Amex' and 'Diners' are supported | 400
InvalidTestCreditCardNumber | On Development and Staging, only specific Credit-Card numbers are supported. See documentation | 400
InvalidIgnoreCardType | The ignoreCardTypes array has an invalid value. Only 'Visa', 'Mastercard', 'Amex' and 'Diners' are supported | 400
InvalidDisbursementItemDirectCreditDetailBsbNumber | When disbursements[].disbursementMethod has a value of 'directCredit' then disbursement[].toDirectCreditDetails.bsbNumber must have a valid Bank-State-Branch code. Format '999-999' | 400
InvalidDisbursementItemDirectCreditDetailAccountNumber | When disbursements[].disbursementMethod has a value of 'directCredit' then disbursement[].toDirectCreditDetails.accountNumber must have a valid Bank Account number. Minimum length is 4 digits. Maximum length is 9 digits | 400
InvalidDisbursementItemDirectCreditDetailInvalidMerchant |  disbursements[].disbursementMethod is 'directCredit'. The merchant you are attempting to pay is invalid to transact | 400
IgnoreCreditCardType |  The creditCardDetails.cardNumber is of a type that is to be ignored | 400
BpayToBpayDetailsReferenceNumberIsNull |  When disbursements[].disbursementMethod is 'BPAY', there must be a valid disbursements[].toBpayDetails.referenceNumber field | 400
BpayToBpayDetailsInvalidNullReferenceNumber | When disbursements[].disbursementMethod is 'BPAY', the field disbursements[].toBpayDetails.referenceNumber must be a valid reference numbe  | 400
BpayValidationError | disbursements[] - BPAY Validation error | 400
InvalidMWalletPin | mWallet.pin is invalid  | 400
MAccountInvalidToTransact | mAccount.token is invalid to transact | 400
InvalidMWallet |  mWallet was not found | 400
InvalidDirectDebit |  directDebit details not found | 400
InvalidMAccount | mAccount was not found  | 400
MWalletInvalidToTransact |  mWallet is not valid to transact  | 400
MAccountInvalidForBPay |  mAccount is not valid for BPAY  | 400
NotAuthorisedToDebitmAccount |  Not authorised to debit from mAccount. Only mAccounts that were issued by yourself may be debited | 400
SignInAccountIsNotAmAccountIssue | Not authorised to issue mAccounts |400
MWalletHasInsufficientFund | mWallet has insufficient funds  |400
DebitTransactionWillExceedMAccountCreditLimi | The amount to debit will exceed the mAccount credit limit | 400
DebitTransactionWillExceedSignInCreditLimit | The amount to debit will exceed your credit limit | 400
OnlyOnemAccountAllowedWithMid | Only one mAccount with their own MID is allowed in the disbursement list  | 400
CreditTransactionWillExceedMAccountCreditLimit |  disbursements[].disbursementMethod will exceed the mAccount credit limit  | 400
YourAccountIsNotAuthorisdedForDirectDebit | Your Account is not authorised for Direct Debit 400
MWalletWillExceedMaximumAllowedBalance |  disbursements[].disbursementMethod will exceed the maximum allowed mWallet balance  | 400
UnknownDirectDebitBsbNumber | The BSB number is unknown to the Platform | 400
InvalidDirectDebitBsbFormat | When paymentSource has a value of 'directDebit' then directDebit.bsbNumber must have a valid Bank-State-Branch code. Format '999-999' | 400
InvalidDirectDebitAccountNumber | When paymentSource has a value of 'directDebit' then directDebit.AccountNumber must have a valid Bank Account number. Minimum length is 4 digits. Maximum length is 9 digits  | 400
InvalidDirectDebitAccountName | When paymentSource has a value of 'directDebit' then directDebit.AccountName must have a valid Bank Account name. Minimum length is 4 characters. Maximum length is 32 characters | 400
NotAuthorisedForBPay |  Your Account is not authorised for BPAY payments  | 400
MAccountInvalidIsACharity | When paymentSource has a value of 'mAccount' then the mAccount must not be a 'Charity' mAccount | 400
InvalidSourceToken |  When paymentSource has a value of 'token' there must be a valid paymentSource.token property  | 400
InvalidSourceTokenHasBeenDeleted |  paymentSource has a value of 'token' which has been deleted | 400
InvalidSourceTokenType |  paymentSource.token represents an invalid token type  | 400
InvalidDisbursementToken |  disbursements[].toToken is unknown  | 400
InvalidDisbursementTokenHasBeenDeleted |  disbursements[].toToken has been delete | 400
DirectDebitMerchantNotValidToTransact | The Australian Bank Account to direct debit is an existing mAccount that is not valid to transact | 400
NoDisbursementToTokenFound |  When disbursements[].disbursementMethod is 'Token', toToken must have a valid token value | 400
ExceedMWalletDailySpendLimit |  Transaction will exceed mWallet daily spend limit | 400
ExceedMWalletMaximumBalance | Transaction will exceed mWallet maximum allowed balance | 400
InvalidCreditCardMidToken | midToken must be a valid token if one is supplied. midTokens are issued by Moneytech Payments | 400
DeletedCreditCardMidToken | midToken has been deleted | 400
CreditCardMidTokenNotOwnedBySignInMerchant |  midToken is not owned by the Signin Merchant | 400
AnMidCanOnlyBeSuppliedWhebSourceIsCreditCard |  A midToken is only valid when the paymentSource is a CreditCard | 400
BlockedDisbursementItemDirectCreditDetailAccount |  disbursements[].disbursementMethod has a value of 'directCredit' but the Australian Bank Account has been blocked from transacting. Please contact Moneytech Payments Pty Ltd | 400
BlockeddDirectDebitAccount |  When paymentSource has a value of 'directDebit'. The Australian Bank Account hase been blocked from transacting. Please contact Moneytech Payments | 400
YouDoNotHavePermissionToProcessDirectDebit |  You do not have permission to process Direct Debits | 400
YouDoNotHavePermissionToProcessDirectCredit | You do not have permission to process Direct Credits  | 400
YouDoNotHavePermissionToProcessCreditCards |  You do not have permission to process Credit-Cards | 400
YouDoNotHavePermissionToProcessBpay | You do not have permission to process BPAY | 400


### Refund

Status Code | Description | HTTP Status
----------- | ----------- | -----------
Ok |  Operation completed successfully  |200
Unauthorized |  Authentication Failure  |401
Exception | An unhandled Exception has occurred. Transaction has been cancelled |400
Error | An unknown processing error occurred. Transaction has been cancelled  |400
RequestBodyNotValidJson | The request body was not valid JSON |400
UniqueReferenceExists | The uniqueReference already exists  |400
UniqueReferencMissing | The uniqueReference must not be empty or null |400
UniqueReferenceExceedsMaxLength | The uniqueReference must not exceed 200 characters in length | 400
InvalidDescription | description must not be empty or null |400
InvalidDescriptionLength | Maximum length of description is 300 character | 400
CreditCardRefundFailed | The refund was rejected by the payment gateway. Gateway response message | 400
DebitTransactionWillExceedSignInCreditLimit | The amount to debit will exceed your credit limi  |400
InvalidRefundAmount | refundAmount must be greater than $0.00 and must be no more than two decimal places |400
InvalidOriginalTransactionId |  originalTransactionId must be greater then 0. This is the transactionId that was returned for the original Credit-Card payment  |400
InvalidOriginalTransactionIdNotFound |  The originalTransactionId was not located. This is the transactionId that was returned for the original Credit-Card payment |400
InvalidOriginalTransactionFromAccountType | The original transaction was not a Credit-Card debit. Only Financial transactions that debited a Credit-Card are supported by the Refund API | 400
InvalidOriginalTransactionWasNotSuccessful |  The original transaction was not successful | 400
InvalidOriginalCreditCardTransactionNotFound |  The original Credit-Card transaction details were not found | 400
InvalidOriginalCreditCardTransactionNotPayment |  The original Credit-Card transaction was not a payment  | 400
InvalidOriginalCreditCardTransactionWasNotSuccessful |  The original Credit-Card transaction was not successful | 400
InvalidOriginalMidTokenIsNotOwnedBySigninMerchant | The original Credit-Card transaction's midToken is not owned by the Sign In Merchant  | 400
InvalidOriginalMidTokenHasBeenDeleted | The original Credit-Card transaction's midToken has been deleted" | 400
YouDoNotHavePermissionToProcessCreditCards |  You do not have permission to process Credit-Cards  | 400


