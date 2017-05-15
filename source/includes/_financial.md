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
  "disbursementMethod":     string,
  "amount":                 number,
  "description":            string,
  "toDirectCreditDetails":  AustralianBankAccount
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

> The above command expects a JSON payload structured like this:

```json
{
  "uniqueReference":                  string,
  "printUniqueReferenceOnStatement":  boolean,
  "totalAmount":                      number,
  "description":                      string,
  "paymentSource":                    string,
  "token":                            string,
  "creditCard":                       CreditCardDetails,
  "mWallet":                          MWalletDetails,
  "mAccount":                         MAccountDetails,
  "directDebit":                      AustralianBankAccount,
  "midToken":                         string,
  "ignoreCardTypes":                  [
                                        string
                                      ],
  "disbursements":                    [
                                        MAccountDisbursementItem, 
                                        DirectCreditDisbursementItem,
                                        BpayDisbursementItem,
                                        TokenDisbursementItem
                                      ]
} 
```

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

### Request Body Field Descriptions

Field Name | Type | Max Size | Description
--------- | ------- | ------ | -----------
*uniqueReference |  string | 200 | This is a unique reference generated by the calling service.  This is a NONCE. Its use is to determine if a request has already been received by the Platform. 
printUniqueReferenceOnStatement | boolean | | If true, the UniqueReference will be printed on the statement. Default is false.
*totalAmount |  number |  | This is the total amount of the transaction
*description |  string | 500 | This description will be displayed on the mWallet and mAccount statements. It should be brief but contain sufficient information to identify the goods. E.g. “Flowers. Inv#: 123456”. 
*paymentSource |  string |  | This is the type of transaction. The correct type MUST be used as it instructs the Platform to move funds according to established rules. Valid values:  <br>directDebit <br>creditCard (see midToken) <br>mAccount <br>token <br>mWallet  (see mWallet note below)
creditCard |  CreditCardDetails | | Details of the Credit-Card to debit 
directDebit | AustralianBankAccount | | Details of the Australian Bank Account to debit
mWallet | MWalletDetails |  | Details of mWallet to Debit. PIN must be supplied. <br> Required if paymentSource = mWallet or disbursement to BPAY otherwise optional. <br> Note: If mWallet details are present although the paymentSource is NOT mWallet, the funds will be visible on the mWallet’s statement. An mWallet must be present if any disbursements are made to a BPAY.
mAccount |  MAccountDetails | | Details of mAccount to Debit. Only mAccounts that you created may be debited.
ignoreCardTypes | [string] | Optional. An array of Credit-Card types you do not want to process. Valid values are [‘Mastercard’, ‘Visa’, ‘Amex’, ‘Diners’]. 
*disbursements | | [BpayDisbursementItem DirectCreditDisbursementItem, MAccountDisbursementItem, MWalletDisbursementItem, TokenDisbursementItem] | An array of disbursement items. Must contain at least one item.  Each disbursement item contains information regarding each required disbursement being either. There is no inherent limit to the number of disbursement or mix of types per transaction.
*Required Fields

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

### Request Body

Same as financial/v1/transaction/execute
The callerUniqueReference will be reusable after the validate call is complete


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
  "transactionStatus": string,
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

> Payload request JSON should look like this:

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
  "ignoreCardTypes":                 [
                                       string
                                     ],
  "disbursements":                   [
                                       MAccountDisbursementItem,
                                       DirectCreditDisbursementItem,
                                       BpayDisbursementItem,
                                       TokenDisbursementItem
                                     ]
}
```

> The above command returns a JSON structured like this:

```json
{
  "transactionId":         number,
  "callerUniqueReference": string,
  "feeAmountExcludingGst": number,
  "feeAmountGstComponent": number,
  "feeAmountIncludingGst": number,
  "bpayReceipts":          [
                              BpayReceiptItem
                           ],
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

### Request Body Field Descriptions

Field Name | Type | Max Size | Description
--------- | ------- | -------|----
*uniqueReference | string | 200 |This is a unique reference generated by the calling service.  This is a NONCE. Its use is to determine if a request has already been received by the Platform. 
printUniqueReferenceOnStatement | boolean |  | If true, the UniqueReference will be printed on the statement. Default is false.
*totalAmount | number | |  This is the total amount of the transaction
*description | string | 500 | This description will be displayed on the mWallet and mAccount statements. It should be brief but contain sufficient information to identify the goods. E.g. “Flowers. Inv#: 123456”. 
*paymentSource | string |  | This is the type of transaction. The correct type MUST be used as it instructs the Platform to move funds according to established rules. Valid values:  <br>directDebit <br>creditCard (see midToken) <br>mAccount <br>token <br>mWallet  (see mWallet note below)
creditCard | CreditCardDetails | | Details of the Credit-Card to debit 
directDebit | AustralianBankAccount | | Details of the Australian Bank Account to debit
mWallet | MWalletDetails |  | "Details of mWallet to Debit. PIN must be supplied.<br>Required if paymentSource = mWallet or disbursement to BPAY otherwise optional. <br> Note: If mWallet details are present although the paymentSource is NOT mWallet, the funds will be visible on the mWallet’s statement. An mWallet must be present if any disbursements are made to a BPAY."
mAccount | MAccountDetails | | Details of mAccount to Debit. Only mAccounts that you created may be debited.
ignoreCardTypes | [string] | |  Optional. An array of Credit-Card types you do not want to process. Valid values are [‘Mastercard’, ‘Visa’, ‘Amex’, ‘Diners’]. 
*disbursements | [BpayDisbursementItem , DirectCreditDisbursementItem, MAccountDisbursementItem, MWalletDisbursementItem, TokenDisbursementItem] | | An array of disbursement items. Must contain at least one item. Each disbursement item contains information regarding each required disbursement being either. There is no inherent limit to the number of disbursement or mix of types per transaction.
*Required Field

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

### Example 1 - Credit-Card -> mWallet 

Debit Credit-Card with the funds going to an mWallet.

For example we are going to debit a crdit card for $100 and credit an mWallet for the full amount.

### Statement

<b>Sign-in Account - 6279059610001205</b>

<img src = "images\Example1\SignInAccountPDFstatement.png">

As can be seen, there was a credit to the Sign-In Account from the Credit-Card for $100.00 then immediately paid the mWallet account.

Moneytech Payments took $3.57 as a processing fee leaving the Sign-In Account with a debt of -$3.57.


<b>mWallet- 6279059700010827</b>

<img src = "images\Example1\mWalletPDF.png">


The mWallet owner simply sees a credit into his/her account for $100.00

### Example 2 – Credit-Card -> mAccount

In this example, we are going to debit a Credit card for flowers costing $100 + a $2 processing fee. We will have the Platform credit two separate mAccounts for the $100 and the $2 fee. This allows you to keep the products cost separate from the fees account.

### Statement

<b>Sign-in Account - 6279059610001205</b>

<img src = "images\Example2\SignInAccountPDFStatement.png">

As expected, there was a credit to the Sign-In Account for $2.00 to cover the fees, with Moneytech Payments debiting the account for $2.84, leaving a closing balance in the account of $-0.84.


Where is the transfer to mAccount 6279059610001205 for $2.00? As the mAccount 6279059610001205 is the same as the Sign-In Account, the Credit-Card funds are credited to the Sign-In Account and therefore the $2.00 is already in the account. The Platform simply ignores the request.

<b>mAccount – 6279059700002972</b>

<img src = "images\Example2\mAccountPDFStatement.png">

As expected, the mAccount sees a credit into their account from the Sign-In Account.

### Example 3 – Credit-Card -> Direct Credit

In this example, we are going to extend Example 2 by having the flowers cost ($100) split into $15 and $85. We will have the $85 paid into the principal account while the $15 paid to a courier bank account.

For example. Let’s say the flowers cost $100 and you have added $2.00 as a processing fee and we are paying an Australian Bank Account $15 for the fee taken from the $100 principal.

### Statement

<b>Sign-in Account - 6279059610001205</b>

<img src = "images\Example3\SignInAccountPDFStatement.png">

With $85.00 being paid to an mAccount, $15.00 being a Direct Credit. Moneytech Payments debited a processing fee of $3.72 leaving a balance of $-1.72.

<b>mAccount – 6279059700002980</b>

<img src = "images\Example3\PrincipalmAccountPDFStatement.png">

<b>BSB Account</b>

<img src = "images\Example3\BSBaccountPDFStatement.png">

Behind the scenes, the Platform creates an mAccount for the Direct Credit request. As you can see from the statement for this mAccount, there has been a Direct Credit made for $85.00.


### Example 4 – Credit-Card -> BPAY

In this example, we are going to extend Example 3 by having the flowers cost ($100) split into $85 & $15. We will have the $85 paid into a BPAY account, $15 paid to the courier bank account via Direct Credit.

We are once again adding $2 as a processing fee to be paid into the Sign-In Account

### Statement

<b>Sign-in Account - 6279059610001205</b> 

<img src = "images\Example4\SignInAccountPDFStatement.png">

With $85.00 being paid to an mAccount, $15.00 being a Direct Credit and Moneytech Payments has debited a processing fee of $3.34, leaving a balance of $-1.34.

<b>BSB Account</b>

<img src = "images\Example4\BSBaccountPDFStatement.png">

Behind the scenes, the Platform creates an mAccount for the direct credit request. As can see from the statement for this mAccount there has been a Direct Credit made for $15.00.

<b>mWallet – 6279059700002980</b>

<img src = "images\Example4\mWalletPDFStatement.png">

As an mWallet was specified, the statement shows how the funds were deposited along with the payment details.


### Example 5 – Credit-Card -> Token & mAccount

In this example, we are going debit a Credit-Card for $102. We will then have $100 paid to a Token.

We are once again adding $2 as a processing fee to be paid into the Sign-In Account


### Example 6 – mAccount -> mAccount & mAccount

In this example, we are going debit an mAccount $27. We will then have $25 paid to another mAccount.

We are once again adding $2 as a processing fee to be paid into the Sign-In Account


### Example 7 – mWallet -> mWallet

In this example, we will debit an mWallet for $100 and credit another mWallet for $100

### Statement

<b>Sign-in Account - 6279059610001205</b> 

<img src = "images\Example7\SigninAccountPDFStatement.png">

<b>Note</b>


The ID’s are all 6 indicating they belong to the same transaction.

<b>Source mWallet- 6279059700010827</b>

<img src = "images\Example7\SourcemWalletPDFStatement.png">

The first row is from Example 1 (we needed some money in the mWallet to transfer).

The second row is the transfer of $100 and who is receiving the funds.

<b>Destination mWallet- 6279059700010835</b>

<img src = "images\Example7\DestinationmWalletPDFStatement.png">

The destination mWallet account shows the deposit for $100 and who it’s from.


### Example 8 – mWallet -> Charity Account

In this example, we are going debit an mWallet for $25 and make a donation to a charity.


### Example 9 – Direct Debit -> mWallet & mAccount

Debit an Australian Bank Account for the funds crediting an mWallet and an mAccount.

For example; Debit an mWallet for $27 and put this into another mWallet

### Statement

<b>Sign-in Account - 6279059610001205</b> 

<img src = "images\Example9\SignInmAccountPDFStatement.png">

You can see the Direct Debit for $27 followed by the payment to the mWallet. Moneytech Payments debited $0.88 for the processing fee. The $2 disbursement has been optimized away.

<b>BSB Account</b>

<img src = "images\Example9\BSBFinancialStatement.png">

Behind the scenes, the Platform creates an mAccount for the direct debit request. As you can see from the statement for this mAccount there has been a Direct Debit made for $27.00.

<b>Destination mWallet- 6279059700010835</b>

<img src = "images\Example9\mWalletFinancialStatement.png">

The destination mWallet account shows the deposit for $25 and who it’s from.


### Example 10 –Token -> mWallet & mAccount

Debit a previously registered Token (using the Token APIs in this document) crediting an mWallet and an mAccount.

For example: Debit a token for $27 and credit an mWallet for $25 and $2 into an mAccount.


### Example 11 – directDebit -> directCredit

In this example, we are going debit an ABA (directDebit) for $100 and credit another ABA (directCredit) for the same amount.


## Transaction - Validate

> The above command expects a JSON payload structured like this:

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
  "ignoreCardTypes":                 [
                                       string
                                     ],
  "disbursements":                   [
                                       MAccountDisbursementItem,
                                       DirectCreditDisbursementItem,
                                       BpayDisbursementItem,
                                       TokenDisbursementItem
                                     ]
}
```

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

Same as financial/v1/transaction/execute


The callerUniqueReference will be reusable after the validate call is complete

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


