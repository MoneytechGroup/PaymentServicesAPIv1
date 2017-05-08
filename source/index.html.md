---
title: MoneyTech RESTful Payment Gateway API Reference

language_tabs:
  - shell: cURL
  - python: Ruby
  - javascript: NodeJS

toc_footers:
  - <a href='#'>Sign Up for a Developer Key</a>
  - <a href="#">Contact Us</a>
  - <a href='https://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - bpay
  - database
  - financial
  - errors

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

# Authentication

> To authorize, use this code:

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
```

```shell
# With shell, you can just pass the correct header with each request
curl "api_endpoint_here"
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
```

> Make sure to replace `meowmeowmeow` with your API key.

Kittn uses API keys to allow access to the API. You can register a new Kittn API key at our [developer portal](http://example.com/developers).

Kittn expects for the API key to be included in all API requests to the server in a header that looks like the following:

`Authorization: meowmeowmeow`

<aside class="notice">
You must replace <code>meowmeowmeow</code> with your personal API key.
</aside>

# API Hierarchy
