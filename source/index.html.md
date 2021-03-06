---
title: MoneyTech Payment Gateway RESTful API Reference - v1.1

language_tabs:
  - shell: cURL
  - python: Python
  - javascript: NodeJS

toc_footers:
  - <a href='#'>Sign Up for a Developer Key</a>
  - <a href="#">Contact Us</a>
  - <a href='https://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - bpay
  - database
  - financial
  - mAccount
  - mWallet
  - public
  - reports
  - security
  - token
  - tools

search: true
---

# Overview

Moneytech Payments thanks you for your interest in our Platform. This document describes our latest offering. It is the result of combining several bespoke and public API offerings with which we have provided clients in the past with the goal of providing a rich set of services to satisfy the majority of customers.


While we remaim open to providing bespoke solutions to clients when the need arises, we feel that the APIs presented in this document will provide the flexibility to solve almost any financial payment requirement your business may have.


We want your experience of using these APIs to be seamless, easy and ‘just work’. For this to happen you need to understand the key concepts discussed in the **Overview** section of this document. We highly recommend that your developers arrange a meeting with our Platform developers. This does a few things to expedite your development:


  * You get to ask and have any concepts explained by some of the people who have written the APIs you will be using
  * You get to know who we are and who to send any questions too
  * Explain to our developers what business problem you are solving, we can then guide you to which APIs you need to use and those you can ignore. It also gives us context for future correspondence

## What is an mWallet and mAccount?

The Platform is a payment gateway developed by Moneytech Payments which provides a high performance and flexible payment solution to enable 3rd parties to develop custom business solutions with ease. Funds may be debited from:

  * Credit-Card (Visa, Mastercard, Diners, Amex)

## Settlement
In Platform terms, the act of a settlement is to calculate the balance of each mAccount at 4PM (Sydney Time) each business day (this balance is called the ‘Settlement Balance’). The ‘Settlement Balance’ is used to create a reversing transaction (called a ‘Settlement Transaction’) to bring the mAccount balance to $0.00. These ‘Settlement Transactions’ are then submitted to either Debit or Credit the physical Australian Bank Account (ABA) attached to the mAccount.

  * A ‘Settlement Balance’ below $0.00 (-ve) will Debit the mAccounts physical Australian Bank Account (ABA)
  * A ‘Settlement Balance’ above $0.00 (+ve) will Credit the mAccounts physical Australian Bank Account (ABA)

### Settlement Frequency
By default, mAcounts are settled every business day at 4PM. Many other options are available by contacting your Moneytech Payments representative. Some of the options are:

  * Daily at 4PM (Sydney Time)
  * Daily at 10AM (Sydney Time)
  * On-Demand
  * Beginning of Month
  * Mid-Month 
  * End of Month
  * Never Settle

### Deferred Settlement - T+n
T+n is a term that indicates how many business days after the Transaction you want the funds Debited from or Credited to the mAccounts linked Australian Bank Account (ABA). When an mAccount is created/updated using the mAccount/v1 APIs, you can set the T+n values independently for both the Debit and Credit settlements. The default is to settle Debit and Credits as T+0 – same day if the transaction occurred before 4pm Sydney time.

How T+n works: The mAccount ‘Settlement Transaction’ is created as usual at 4pm each business day. The ‘Settlement Transaction’ date is set to the calculated date in the future (+n business days) and will appear on the statement with this future date (so you know when to expect it). The actual instructions to Debit or
Credit the funds are delayed until the calculated date.

### Settlement Notifications
mAccounts receive a settlement email at the end of the settlement run, explaining the amount to be Debited/Credited to their mAccounts physical Australian Bank Account, the date the settlement will occur (remember T+n) and a financial statement (as a PDF) which lists each transaction that was settled, as well as an Excel Spreadsheet with all the transactions listed in the PDF statement for further analysis.

### Sample Settlement Email
<img src = "images\Settlement\SettlementSampleEmail.png">

<b>Note</b>


The above ‘Credit Date’ would have the actual date the settlement would occur if T+n are > 0.

### Sample PDF Settlement Statement
The Statement From Date and the To date in the statement below (inside the green box) are from 4pm the previous settlement date (5th May 2017 – A Friday) to 4pm the current settlement date (8th May 2017 – A Monday). This is why it’s called a Settlement Statement. It’s only showing transactions that were settled on the 8th May 2017 (a Monday) which included any transactions over the weekend.

When looking at any of the Platform statements, think of the Platform as a bank. In the example below, the Settlement transaction (row 2) shows there is a Debit of $85.00 for the settlement. This is a Debit FROM your Platform account and will therefore be a Credit INTO your physical bank account.


<img src = "images\Settlement\SettlementSamplePDFStatement.png">

### Sample Excel Settlement Spreadsheet
The Settlement Notification email includes an Excel spreadsheet with the same details as the PDF Settlement Statement. This provides you with the same data that you can use for analysis.


<img src = "images\Settlement\SettlementSampleSpreadsheet.png">

## Financial Statements
The Platform will automatically send financials statements to both mAccounts and mWallets if an email address is provided. These include Month to Date, Last Month, Last Financial Year and others.

Statements are emailed as a PDF attachment along with an Excel spreadsheet containing the same details as the PDF statement.

Using the mAccount/v1/sendStatement and mWallet/v1/sendStatement APIs you may request a statement to be sent at any time.

A Credit Settlement transaction will appear as a Debit on your physical Bank Statement and a Debit Settlement transaction will appear as a Credit on your physical Bank Statement. Both mAccounts and mWallets represent a financial account held on the Platform. The Statements are in respect to the Platform NOT your physical bank account.

### Example – mAccount Month To Date Financial Statement

<img src = "images\FinancialStatement.png">


# Authentication

> To authorize, use this code:

```python
from requests.auth import HTTPBasicAuth

requests.get("BASE_URL+SOME_ENDPOINT", auth=HTTPBasicAuth('user', 'pass'))
```

```shell
# With shell, you can just pass the correct header with each request
curl --basic --user user:password BASE_URL+SOME_ENDPOINT
```

```javascript
var options = {
   host: 'BASE_URL',
   port: 443,
   path: 'SOME_ENDPOINT',
   // authentication headers
   headers: {
      'Authorization': 'Basic ' + new Buffer(user + ':' + pass).toString('base64')
   }   
};

//this is the call
request = https.get(options, function(res){
   var body = "";
   res.on('data', function(data) {
      body += data;
   });
   res.on('end', function() {
    //here we have the full response, html or json object
      console.log(body);
   })
   res.on('error', function(e) {
      onsole.log("Got error: " + e.message);
   });
  });

}
```

> Make sure to replace user and pass with your authentication details.

**Live Authentication Credentials**


Field | Value
----- | -----
Username | Your Platform 16-Digit account number
Password | TBA
Base URL | https://api.mpay.com.au/

The RESTful APIs in this document all use BASIC Authentication (except those APIs in public/v1) in four scenarios; either:

 - UserName/Password
 - SecurityToken
 - OneShotSecurityToken
 - ImpersonationToken


When using the LIVE Platform, your Sign-In Account is given five (5) attempts to authenticate your credentials. On the fifth failure your Sign-In Account is locked for one (1) hour. The returned data will indicate that your account is locked and the time in UTC that the account will be unlocked. 


When using the Staging system, you are given fifty (50) attempts with a lockout time of two (2) minutes.


If you require the account to be unlocked on the LIVE system you may contact your Moneytech Payments representative and at his or her discretion they will unlock the account. A fee may be applied for this service.
See the API routes in Security to manage Passwords and Tokens.

## UserName/Password

Using this scenario you configure BASIC Authentication with the following:

 * UserName  - your mAccounts 16-Digit account number (This is called the Sign-In Account)
 * Password  - password that will be supplied by Moneytech Payments when you have demonstrated successful implementation of the API on our Staging environment


Passwords are stored in a cryptographic format that is not reversible. If you forget your password, it cannot be recovered. You will need to contact Moneytech Payments and have a new password generated. There will be a fee for this.

## SecurityToken
Using this scenario, you make an API call to security/v1/createSecurityToken using UserName/Password. A SecurityToken is returned that may be used multiple times until it expires. See the security/v1 section for further details.


The SecurityToken returned is used in place of your UserName when configuring BASIC Authentication for future API calls (No password is required).


Expiry time is between 1 and 15 minutes.

## OneShotSecurityToken
Using this scenario, you make an API call to security/v1/createOneShotSecurityToken using UserName/Password. A OneShotSecurityToken is returned that can be used only once or until it expires.


An OneShotSecurityToken is exactly the same as the SecurityToken scenario except the token will be deleted on first use.


Expiry time is between 1 and 15 minutes.

## ImpersonationToken

Using this scenario, you make an API call to security/v1/createImpersonationTokenAsIssuer using UserName/Password and provid the mAccount you want to impersonate.  An ImpersonationToken is returned that is used to call any other API (as the other tiken types) except this time the Platform acts as you are the mAccount supplied as the Sign-In Account. This API is only available to Issuers. Extremy usefull to retrieve financial data or access to the User Database for each mAccount you own to generate custom statements and reports.

# Testing

## Staging Authentication Credentials

Field | Value
--- | ----
Username | 6279059610001205
Password | $MP@yments2968
Base URL | https://api.m-pay.com.au/

## Staging Test Credit-Cards

Card Type | Card Number | Expiry Date
---- | --- | -----
MasterCard| 5123456789012346 | 05/17
Visa| 4987654321098769 | 05/17
Amex| 345678901234564| 05/17
Diners Club| 30123456789019 | 05/17


To allow testing Credit-Card failures, you can set the status code you wish to have returned by changing the Credit-Cards CVN (Amex has a 4 digit CVN)

Description | CVN | CVN (American Express) 
------- | ----- | ---
Transaction approved  | 000 | 0000
Transaction could not be processed  | 010 | 0010
Transaction declined  | 005 | 0005
No reply from processing host | 068 | 0068
Card has expired  | 033 | 0033
Insufficient credit | 051 | 0051


# API v1.1 Hierarchy
