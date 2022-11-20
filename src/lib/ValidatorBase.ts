import { NextFunction, Request, Response } from 'express';
import Joi from "joi";
import { RequestValidationMiddlewareError } from './errors/RequestValidationMiddlewareError';

export interface IValidateAllSchema {
  body?: Joi.ObjectSchema;
  cookies?: Joi.ObjectSchema;
  headers?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
}

export interface IValidateAllResponse {
  body?: Joi.ValidationError | undefined;
  cookies?: Joi.ValidationError | undefined;
  headers?: Joi.ValidationError | undefined;
  params?: Joi.ValidationError | undefined;
  query?: Joi.ValidationError | undefined;
}

const commonValidatorOptions = { abortEarly: false }
/**
  * Function to get request body validation errors
  * @param validatorSchema Joi.ObjectSchema
  * @returns Joi.ValidationError | undefined
  */
const getBodyValidationErrors = (validatorSchema: Joi.ObjectSchema, body): Joi.ValidationError | undefined => {
  return validatorSchema.validate(body, commonValidatorOptions).error;
}
/**
 * Middleware to validate request body
 * @param validatorSchema Joi validatorSchema of the request body
 */
export const validateBody = (validatorSchema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction): void => {
  const { body } = req;
  const validationErrors = getBodyValidationErrors(validatorSchema, body);
  const err: Partial<IValidateAllResponse> = {
    body: validationErrors
  }
  if (validationErrors) {
    return next(new RequestValidationMiddlewareError(err as Record<string, unknown>[]));
  }
  next();
}

/**
  * Function to get request cookies validation errors
  * @param validatorSchema Joi.ObjectSchema
  * @returns Joi.ValidationError | undefined
  */
const getCookiesValidationErrors = (validatorSchema: Joi.ObjectSchema, cookies): Joi.ValidationError | undefined => {
  return validatorSchema.validate(cookies, commonValidatorOptions).error;
}
/**
 * Middleware to validate request cookies
 * @param validatorSchema Joi validatorSchema of the request cookies
 */
export const validateCookies = (validatorSchema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction): void => {
  const { cookies } = req;
  const validationErrors = getCookiesValidationErrors(validatorSchema, cookies);
  const err: Partial<IValidateAllResponse> = {
    cookies: validationErrors
  }
  if (validationErrors) {
    return next(new RequestValidationMiddlewareError(err as Record<string, unknown>[]));
  }
  next();
}

/**
  * Function to get request headers validation errors
  * @param validatorSchema Joi.ObjectSchema
  * @returns Joi.ValidationError | undefined
  */
const getHeadersValidationErrors = (validatorSchema: Joi.ObjectSchema, headers): Joi.ValidationError | undefined => {
  return validatorSchema.validate(headers, commonValidatorOptions).error;
}
/**
 * Middleware to validate request headers
 * @param validatorSchema Joi validatorSchema of the request headers
 */
export const validateHeaders = (validatorSchema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction): void => {
  const { headers } = req;
  const validationErrors = getHeadersValidationErrors(validatorSchema, headers);
  const err: Partial<IValidateAllResponse> = {
    headers: validationErrors
  }
  if (validationErrors) {
    return next(new RequestValidationMiddlewareError(err as Record<string, unknown>[]));
  }
  next();
}

/**
  * Function to get request params validation errors
  * @param validatorSchema Joi.ObjectSchema
  * @returns Joi.ValidationError | undefined
  */
const getParamsValidationErrors = (validatorSchema: Joi.ObjectSchema, params): Joi.ValidationError | undefined => {
  return validatorSchema.validate(params, commonValidatorOptions).error;
}
/**
 * Middleware to validate request params
 * @param validatorSchema Joi validatorSchema of the request params
 */
export const validateParams = (validatorSchema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction): void => {
  const { params } = req;
  const validationErrors = getParamsValidationErrors(validatorSchema, params);
  const err: Partial<IValidateAllResponse> = {
    params: validationErrors
  }
  if (validationErrors) {
    return next(new RequestValidationMiddlewareError(err as Record<string, unknown>[]));
  }
  next();
}

/**
  * Function to get request query validation errors
  * @param validatorSchema Joi.ObjectSchema
  * @returns Joi.ValidationError | undefined
  */
const getQueryValidationErrors = (validatorSchema: Joi.ObjectSchema, query): Joi.ValidationError | undefined => {
  return validatorSchema.validate(query, commonValidatorOptions).error;
}
/**
 * Middleware to validate request query
 * @param validatorSchema Joi validatorSchema of the request query
 */
export const validateQuery = (validatorSchema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction): void => {
  const { query } = req;
  const validationErrors = getQueryValidationErrors(validatorSchema, query);
  const err: Partial<IValidateAllResponse> = {
    query: validationErrors
  }
  if (validationErrors) {
    return next(new RequestValidationMiddlewareError(err as Record<string, unknown>[]));
  }
  next();
}

/**
   * Function to get request query validation errors
   * @param validatorSchema Joi.ObjectSchema
   * @param request Express request
   * @returns Joi.ValidationError | undefined
   */
const getAllValidationErrors = (validatorSchema: IValidateAllSchema, request: Request): IValidateAllResponse | undefined => {
  const validateAllResponse: IValidateAllResponse = {
    body: validatorSchema.body?.validate(request.body, commonValidatorOptions).error,
    cookies: validatorSchema.cookies?.validate(request.cookies, commonValidatorOptions).error,
    headers: validatorSchema.headers?.validate(request.headers, commonValidatorOptions).error,
    params: validatorSchema.params?.validate(request.params, commonValidatorOptions).error,
    query: validatorSchema.query?.validate(request.query, commonValidatorOptions).error,
  }

  if (validateAllResponse.body
    || validateAllResponse.cookies
    || validateAllResponse.headers
    || validateAllResponse.params
    || validateAllResponse.query) {
    return validateAllResponse;
  }
  return undefined;
}

/**
  * Function to validate request [body,query,params,headers,cookies]
  * @param validatorSchema IValidateAllSchema
  */
export const validateAll = (validatorSchema: IValidateAllSchema) => (req: Request, res: Response, next: NextFunction): void => {
  const validateAllResponse: IValidateAllResponse | undefined = getAllValidationErrors(validatorSchema, req);
  if (validateAllResponse) {
    return next(new RequestValidationMiddlewareError(validateAllResponse as Record<string, unknown>[]));
  }
  return next()
}