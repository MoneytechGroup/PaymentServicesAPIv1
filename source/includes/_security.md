# Security
## Overview

The security/v1 APIs provide services to manage security tokens which give you an alternative to using UserName/Password for BASIC authentication for each API call. Security tokens come in three forms:

 * OneShotSecurityToken
 * SecurityToken
 * ImpersonationSecurityToken


All three security tokens operate exactly the same. The token is used to replace your UserName when configuring BASIC Authentication (no password is required, it will be ignored if supplied). Each token type has an expiry time between 1 and 15 minutes.


A OneShotSecurityToken can only be used only once. The token is deleted on its first use or when it expires.


A SecurityToken can be used multiple times until it expires. A SecurityToken may have its expiry time extended where a OneShotSecurityToken can not.


The ImpersonateionSecurityToken is used the same as the others except it allowes the Sign-In Account to ‘impersonate’ another account they own. The Sign-In Account must be an Issuing mAccount and is created using the API security/v1/createImpersonationTokenAsIssuer.


All token types may be deleted before they expire by calling security/v1/deleteSecurityToken.


**Note:**  The security tokens discussed in this section provide secure sign-in from a web page. They have nothing to do withn the token/v1 APIs described elsewhere in this document.

## Objects
### DisbursementFeeDetail
> Schema for this object

```json
{
  "method":             string,
  "feePercentageExGst": number,
  "feeFixedExGst":      number
}
```

Returns the fee details for a particular disbursement (credit) method.


Field Name|Type| Description
----|---|-------
method| string | The type of  Disbursement:<br>mAccount<br>mWallet<br>DirectCredit<br>BPAY<br>Charity<br>Sign-In mAccount
feePercentageExGst| number | The percentage of the amount to be taken as a fee Excluding GST 
feeFixedExGst|number | The fixed amount to be taken as a fee Excluding GST

### LoadFeeDetail
> Schema for this object

```json
{
  "method":             string,
  "cardType":           string,
  "debitFromMAccount":  string,
  "feePercentageExGst": number,
  "feeFixedExGst":      number
}
```

Returns the fee details for a particular disbursement (credit) method.


Field Name|Type| Description
----|---|-------
method | string | The type of  Disbursement:<br>mAccount<br>mWallet<br>DirectDebit<br>CreditCard<br>Charity<br>Sign-In mAccount
cardType | string | Type of Credit-Card. Null if method is not CreditCard<br>Mastercard<br>Visa<br>Diners<br>Amex
debitFromMAccount |string | Contains the 16-Digit if the fee is associated to a specific mAccount, otherwise null
feePercentageExGst | number | The percentage of the amount to be taken as a fee Excluding GST 
feeFixedExGst |number | The fixed amount to be taken as a fee Excluding GST


## Change Password

> The above command returns JSON structured like this:

```json
{
	"status": 				string,
	"statusDescription":	string,
	"durationMs": 			number
}
```

This API allows the Sign-In Account to change their Sign-In password.


The new password must be passed in twice in fields password1 and password2. 

### HTTP Request

`POST BASE_URL + /security/v1/changePassword`

### Request Body Schema

```json
{
  	"password1": string,
  	"password2": string
}
```

Field Name|Type|Length|Description
----------|----|-------|-----------
password1|string|4 => 100|New password value. 
password2|string|4 => 100|Copy of new password value for verification.

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Create One-Shot Security Token

> The above command returns JSON structured like this:

```json
{
  	"oneShotSecurityToken":  string,
  	"status":			 	         string,
  	"statusDescription": 	   string,
  	"durationMs":		 	       number
}
```

This API returns a security token that can be used only once or until it expires. The purpose of this token is that it can be embedded in a web form to enable you to make a single call to the Platform without exposing your Sign-In Account credentials.


As an example, it is useful if you capture a customer’s Credit-Card details and want to pass those details to the Platform token/v1 APIs to create a new token. By making the call from the web page, the Credit-Card details are never exposed to your web server. Create the OneShotSecurityToken from your backend service and embed the token in the page so it can be used when youmake the call to create the Credit-Card token.


When setting your security credentials to call any of the APIs in this document (except for security/v1/createOneShotToken and security/v1/createSecurityToken), set the Username to the returned OneShotSecurityToken and set the password to anything as it will be ignored.


If you create the token and no longer require it, call security/v1/deleteSecurityToken to have the token removed.


### HTTP Request

`GET BASE_URL + /security/v1/v1/createOneShotSecurityToken/{expiryMinutes}`

### Request Parameter Decriptions

Field Name|Description
----------|-----------
expiryMinutes|The number of minutes the token can stay alive. Any value between 1 and 15minutes inclusive.

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
oneShotSecurityToken|string|The token to use instead of UserName.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Create Security Token

> The above command returns JSON structured like this:

```json
{
  	"securityToken": 		  string,
  	"status":			 	      string,
  	"statusDescription": 	string,
  	"durationMs":		 	    number
}
```

This API returns a security tokenthat can be used many times or until it expires. The purpose of this token is that it can be embedded in a web form to enable you to make multiple calls to the Platform without exposing your Username and Password.


When setting your security credentials to call any of the APIs in this document (except for security/v1/createOneShotToken and security/v1/createSecurityToken), set the Username to the returned securityToken property and the password to anything as it will be ignored.


If you create the token and no longer require it, call security/v1/deleteSecurityToken to have the token removed.


You may extend the life of a securityTokenby calling the API security/v1/refreshSecurityToken. 



### HTTP Request

`GET BASE_URL + /security/v1/createSecurityToken/{expiryMinutes}`

### Request Parameter Decriptions

Field Name|Description
----------|-----------
expiryMinutes|The number of minutes the token can stay alive. Any value between 1 and 15minutes inclusive.

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
securityToken|string|The token to use instead of UserName.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Delete Security Token

> The above command returns JSON structured like this:

```json
{
  	"status":			 	      string,
  	"statusDescription": 	string,
  	"durationMs":		 	    number
}
```

This API deletes the security token specified in the parameter {token}. If no {token} parameter is present, the token used to Sign-In will be used if present. This API is to be used when you no longer need the token and do not want to wait until it expires.

### HTTP Request

`GET BASE_URL + /security/v1/deleteSEcurityToken/{token}`

### Request Parameter Decriptions

Field Name|Description
----------|-----------
token|Basic Authentication with UserName/Password or SecurityToken or OneShotSecurityToken

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Create Impersonation Token as Issuer

> The above command returns JSON structured like this:

```json
{
	"impersonationToken":	  string,
  	"status":			 	      string,
  	"statusDescription": 	string,
  	"durationMs":		 	    number
}
```

This API returns an impersonation token to allow the the impersonation of the mAccount specified in {accountNumber}. This API requires the Sign-In Account to be an Issuer (see security/v1/signInAccountSettings). The impersonation token returned is used exactly the same as any other security Token. 


If you create the token and no longer require it, call security/v1/deleteSecurityToken to have the token removed.


You may extend the life of a SecurityToken by calling the API security/v1/refreshSecurityToken. 


Why would you want to use this? Using the mAccount/v1/listAsIssuer API which returns a list of accounts that you own, you can use this API to impersonate any of the those mAccounts to retrieve transaction details, access the database/V1 API’s or even execute a transaction on their behalf. This means you can create custom reports, statements or anything else you may require.


### HTTP Request

`GET BASE_URL + /security/v1/createImpersonationTokenAsIssuer/{accountNumber}/{expiryMinutes}`

### Request Parameter Decriptions

Field Name|Description
----------|-----------
accountNumber	| Ther 16-Digit account number to impersonate
expiryMinutes	| The number of minutes the token can stay alive. Any value between 1 and 15minutes inclusive.

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
impersonationToken|string|The token to use instead of UserName.
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Refresh Security Token

> The above command returns JSON structured like this:

```json
{
  	"status":			 	      string,
  	"statusDescription": 	string,
  	"durationMs":		 	    number
}
```

This API extends the life of the SecurityToken specified in the parameter {token} (If no {token} parameter the Sign-In token will be extended). The new expiry time is set by adding the number of minutes specified when the SecurityToken was created to the current time. 


i.e. If the SecurityToken is created with an expiry of 5 minutes, then the new expiry time would be the current time + 5minutes.


OneShotSecurityTokens can not have their life span extended.


### HTTP Request

`GET BASE_URL + /security/v1/refreshSecurityToken/{token}`

### Request Parameter Decriptions

Field Name|Description
----------|-----------
token | Optional. The SecurityToken you wish to extend its life. OneshotSecurityTokens are NOT supported.

### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Sign In Account Settings

> The above command returns JSON structured like this:

```json
{
  	"canDebitCreditCards":           boolean,
  	"canPayBpay":                    boolean,
  	"canImpersonate":                boolean,
  	"canDirectDebit":                boolean,
  	"canDirectCredit":               boolean,
  	"canCreateMAccounts":            boolean,
  	"canCreateMWallets":             boolean,
  	"canAccessUserDatabase":         boolean,
  	"isIssuer":                      boolean,
  	"issuerMAccountNumber":          string,
  	"monthlyFeeExGst":               number,
  	"clearingMAccountNumber":        string,
  	"feeMAccountNumber":             string,
  	"feeMAccountMonthlyFeeExGst":    number,
  	"childMAccountSetupFeeExGst":    number,
  	"childMAccountMonthlyFeeExGst":  number,
  	"disbursementFees":              [
                                        DisbursementFeeDetail
					  				                 ],
  	"loadFees":                      [
                                        LoadFeeDetail
					  				                 ],
  	"status": 						           string,
  	"statusDescription":             string,
  	"durationMs":                    number
}

```

This API returns the fees and permissions that have been given to the Sign-In Account.


### HTTP Request

`GET BASE_URL + /security/v1/signInAccountSettings`


### Response Field Descriptions ###

Field Name | Type | Description
--------- | ------- | -----------
canDebitCreditCards|boolean| True if the Sign-In Account has permission to debit/Refund Credit-Cards	
canPayBpay|boolean| True if the Sign-In Account has permission to make PBAY payments	
canImpersonate|boolean| True if the Sign-In Account has permission to use the security/v1/createImpersonationTokenAsIssuer	
canDirectDebit|boolean| True if the Sign-In Account has permission to Direct Debit an ABA 	
canDirectCredit|boolean| True if the Sign-In Account has permission to Direct Credit an ABA	
canCreateMAccounts|boolean| True if the Sign-In Account has permission to create mAccounts	
canCreateMWallets|boolean| True if the Sign-In Account has permission to create mWallets	
canAccessUserDatabase|boolean| True if the Sign-In Account has permission to access the User Database	
isIssuer|boolean| True if the Sign-In Account is an issuer	
issuerMAccountNumber|string| 16-digit Account number of Issuer.	
monthlyFeeExGst|number| The monthly fee (ExGst) for the Sign-In Account	
clearingMAccountNumber|	string| 16-digit Account number of Sign-In Clearing Account	
feeMAccountNumber|number| 16-Digit Account number of Fee Accountif there is one	
feeMAccountMonthlyFeeExGst|number| Monthly fee (ExGST) of the Sign-In Fee Account	
childMAccountSetupFeeExGst|number| Set-up fee (ExGST) for each mAccount created vian mAccount/v1/create	
childMAccountMonthlyFeeExGst|number| Monthly fee (ExGST) for each mAccount created vian mAccount/v1/create	
disbursementFees|[DisbursementFeeDetail| 	An array of DisbursementFeeDetail class	
loadFees|[LoadFeeDetail| 	An array of LoadFeeDetail  class	
status | string | This is the status of executing the request. A code of ‘Ok’ indicates no errors. See the sectionStatus & Descriptions
statusDescription | string | This is a plain English description of the status. See the sectionStatus Description.
durationMs | number | This can be ignored. This value represents the total time in milliseconds that thePlatform took to process the request.


## Status Codes and Descriptions

Status Code | Description | HTTP Status
---|---|---
Ok | Validation has passed | 200
Unauthorized | Authentication failure | 401
Error | An Exception has occurred on the server| 400
UnableToCreateOneShotSecurityToken | Unable to create a OneShotSecurityToken| 400
UnableToCreateSecurityToken | Unable to create a SecurityToken.| 400
OnlyBasicAuthenticationIsSupportedToCreateAnySecurityToken | A OneShotSecurityToken or a SecurityToken can only be created using Basic Authentication| 400
InvalidTimeOutValue | timeOut parameter is invalid. Valid range is 1 => 15 minutes| 400
UnableToDeleteSecurityToken | Unable to delete security token.| 400
UnableToRefreshSecurityToken | Unable to refresh security token.| 400
NoTokenToDelete | No security token provided to delete.| 400
OneShotTokenCanNotBeRefreshed | Unable to refresh a oneShotToken.| 400
NoTokenToRefresh | No security token provided to refresh.| 400
YouAreNotAuthorizedForImpersonation | "Your account is not valid to impersonate another mAccount.| 400
TheMAccountToImpersonateIsNotValid | The account you want to impersonate does not exist or you are not authorised.| 400
PasswordsDoNotMatch | Password1 and Password2 must have a length between 4 and 100.| 400
PasswordInvalidLength | Password1 and Password2 do not match.| 400
