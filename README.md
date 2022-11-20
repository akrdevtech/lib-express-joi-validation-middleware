# Express Joi Validation Middleware
## Description
Implementation of [Joi](https://www.npmjs.com/package/joi) middleware for ExpressJS with TS.
-   TypeScript support.
-   Specify the order in which request inputs are validated.
## Quick Links

-   [Example Usage (TypeScript)](https://www.npmjs.com/package/@akrdevtech/lib-express-joi-validation-middleware#Example-Usage-ts)
-   [Example Usage (JavaScript)](https://www.npmjs.com/package/@akrdevtech/lib-express-joi-validation-middleware#Example-Usage-js)
-   [Behaviours](https://www.npmjs.com/package/@akrdevtech/lib-express-joi-validation-middleware#Behaviours)
    -   [Validation Ordering](https://www.npmjs.com/package/@akrdevtech/lib-express-joi-validation-middleware#validation-ordering)
    - [Validation Options](https://www.npmjs.com/package/@akrdevtech/lib-express-joi-validation-middleware#validation-options)
## Usage
### Install
```sh
npm i @akrdevtech/lib-express-joi-validation-middleware
```
### [](https://www.npmjs.com/package/@akrdevtech/lib-express-joi-validation-middleware#Example-Usage-ts) Example Usage (TypeScript)

Validate `body`,`query`,`cookies`,`headers`&`params` at once using . Each of these may be optional as well.
```js script
import * as Joi from 'joi'
import * as express from 'express'
import { validateAll } from  '@akrdevtech/lib-express-joi-validation-middleware';

const app = express()

const validateAllSchema: IValidateAllSchema = {
    body: Joi.object({
        someField: Joi.string().min(3).required(),
    }),
    query: Joi.object({
        someField: Joi.string().min(3).required(),
    }),
    cookies: Joi.object({
        someField: Joi.string().min(3).required(),
    }),
    headers: Joi.object({
        someField: Joi.string().min(3).required(),
    }),
    params: Joi.object({
        someField: Joi.string().min(3).required(),
    }),
}

app.get('/', [
  validateAll(validateAllSchema),
  (req, res) => { res.send(`Hello World!`) }
]);

// with joi validation options
app.get('/with-joi-validation-option', [
  validateAll(validateAllSchema,{ allowUnknown:true }),
  (req, res) => { res.send(`Hello World!`) }
]);

const port = 8000;
app.listen(port, () => {console.log(`⚡️ Service started : PORT → ${port}}`);
```
### [](https://www.npmjs.com/package/@akrdevtech/lib-express-joi-validation-middleware#Example-Usage-js) Example Usage (JavaScript)
```js script
const Joi = require('joi')
const app = require('express')()
const {
    validateAll,
    validateBody,
    validateCookies,
    validateHeaders,
    validateQuery,
    validateParams
} = require('@akrdevtech/lib-express-joi-validation-middleware');

const validateAllSchema: IValidateAllSchema = {
    body: Joi.object({
        someField: Joi.string().min(3).required(),
    }),
    query: Joi.object({
        someField: Joi.string().min(3).required(),
    }),
    cookies: Joi.object({
        someField: Joi.string().min(3).required(),
    }),
    headers: Joi.object({
        someField: Joi.string().min(3).required(),
    }),
    params: Joi.object({
        someField: Joi.string().min(3).required(),
    }),
}
const headerSchema = Joi.object({ someField: Joi.string().required() });
const bodySchema = Joi.object({ someField: Joi.string().required() });
const querySchema= Joi.object({ someField: Joi.string().required() });
const cookieSchema= Joi.object({ someField: Joi.string().required() });
const paramSchema= Joi.object({ someField: Joi.string().required() });

app.get('/', [
  validateAll(validateAllSchema),
  (req, res) => { res.send(`Hello World!`) }
]);

app.get('/separately', [
  validateQuery(querySchema),
  validateBody(bodySchema),
  validateCookies(cookieSchema),
  validateHeaders(headerSchema),
  validateParams(paramSchema),
  (req, res) => { res.send(`Hello World!`) }
]);

const port = 8000;
app.listen(port, () => {console.log(`⚡️ Service started : PORT → ${port}}`);
```
##  [](https://www.npmjs.com/package/@akrdevtech/lib-express-joi-validation-middleware#Behaviours)Behaviours


### [](https://www.npmjs.com/package/@akrdevtech/lib-express-joi-validation-middleware#validation-ordering)Validation Ordering

Validation can be performed in a specific order using standard express middleware behaviour. Pass the middleware in the desired order.

Here's an example where the order is headers, body, query:
```js script
const headerSchema = Joi.object({ someField: Joi.string().required() });
const bodySchema = Joi.object({ someField: Joi.string().required() });
const querySchema= Joi.object({ someField: Joi.string().required() });

route.get('/', [
  validator.headers(headerSchema),
  validator.body(bodySchema),
  validator.query(querySchema),
  routeHandler
]);
```

### [](https://www.npmjs.com/package/@akrdevtech/lib-express-joi-validation-middleware#validation-options)Validation Options
Validation options can be extented with [`Joi.ValidationOptions`](https://joi.dev/api/?v=17.7.0#anyvalidatevalue-options).

Here’s an example where the order is headers, body, query:
```js script
const bodySchema = Joi.object({ someField: Joi.string().required() });

const options = {
	abortEarly: false,
	allowUnknown: true,
}

route.get('/', [
  validator.headers(headerSchema, options),
  routeHandler
]);
```