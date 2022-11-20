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

const commonValidatorOptions: Partial<Joi.ValidationOptions> = { abortEarly: false };

/**
  * Function to get request body validation errors
  * @param validatorSchema Joi.ObjectSchema
  * @param body Express request body
  * @param joiValidationOptions Joi.ValidationOptions
  * @returns Joi.ValidationError | undefined
  */
const getBodyValidationErrors = (
  validatorSchema: Joi.ObjectSchema,
  body,
  joiValidationOptions?: Partial<Joi.ValidationOptions>
): Joi.ValidationError | undefined => {
  return validatorSchema.validate(body, joiValidationOptions).error;
}
/**
 * Middleware to validate request body
 * @param validatorSchema Joi validatorSchema of the request body
 * @param joiValidationOptions Joi.ValidationOptions
 */
export const validateBody = (
  validatorSchema: Joi.ObjectSchema,
  joiValidationOptions?: Partial<Joi.ValidationOptions>
) => (req: Request, _res: Response, next: NextFunction): void => {
  const { body } = req;
  const validationErrors = getBodyValidationErrors(
    validatorSchema,
    body,
    { ...commonValidatorOptions, ...joiValidationOptions }
  );
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
  * @param cookies Express request cookies
  * @param joiValidationOptions Joi.ValidationOptions
  * @returns Joi.ValidationError | undefined
  */
const getCookiesValidationErrors = (
  validatorSchema: Joi.ObjectSchema,
  cookies,
  joiValidationOptions?: Partial<Joi.ValidationOptions>
): Joi.ValidationError | undefined => {
  return validatorSchema.validate(cookies, joiValidationOptions).error;
}
/**
 * Middleware to validate request cookies
 * @param validatorSchema Joi validatorSchema of the request cookies
 * @param joiValidationOptions Joi.ValidationOptions
 */
export const validateCookies = (
  validatorSchema: Joi.ObjectSchema,
  joiValidationOptions?: Partial<Joi.ValidationOptions>
) => (req: Request, _res: Response, next: NextFunction): void => {
  const { cookies } = req;
  const validationErrors = getCookiesValidationErrors(
    validatorSchema,
    cookies,
    { ...commonValidatorOptions, ...joiValidationOptions }
  );
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
  * @param headers Express request headers
  * @param joiValidationOptions Joi.ValidationOptions
  * @returns Joi.ValidationError | undefined
  */
const getHeadersValidationErrors = (
  validatorSchema: Joi.ObjectSchema,
  headers,
  joiValidationOptions?: Partial<Joi.ValidationOptions>
): Joi.ValidationError | undefined => {
  return validatorSchema.validate(headers, joiValidationOptions).error;
}
/**
 * Middleware to validate request headers
 * @param validatorSchema Joi validatorSchema of the request headers
 * @param joiValidationOptions Joi.ValidationOptions
 */
export const validateHeaders = (
  validatorSchema: Joi.ObjectSchema,
  joiValidationOptions?: Partial<Joi.ValidationOptions>
) => (req: Request, _res: Response, next: NextFunction): void => {
  const { headers } = req;
  const validationErrors = getHeadersValidationErrors(
    validatorSchema,
    headers,
    { ...commonValidatorOptions, ...joiValidationOptions }
  );
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
  * @param params Express request params
  * @param joiValidationOptions Joi.ValidationOptions
  * @returns Joi.ValidationError | undefined
  */
const getParamsValidationErrors = (
  validatorSchema: Joi.ObjectSchema,
  params,
  joiValidationOptions?: Partial<Joi.ValidationOptions>
): Joi.ValidationError | undefined => {
  return validatorSchema.validate(params, joiValidationOptions).error;
}
/**
 * Middleware to validate request params
 * @param validatorSchema Joi validatorSchema of the request params
 * @param joiValidationOptions Joi.ValidationOptions
 */
export const validateParams = (
  validatorSchema: Joi.ObjectSchema,
  joiValidationOptions?: Partial<Joi.ValidationOptions>
) => (req: Request, _res: Response, next: NextFunction): void => {
  const { params } = req;
  const validationErrors = getParamsValidationErrors(
    validatorSchema,
    params,
    { ...commonValidatorOptions, ...joiValidationOptions }
  );
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
  * @param query Express request query
  * @param joiValidationOptions Joi.ValidationOptions
  * @returns Joi.ValidationError | undefined
  */
const getQueryValidationErrors = (
  validatorSchema: Joi.ObjectSchema,
  query,
  joiValidationOptions?: Partial<Joi.ValidationOptions>
): Joi.ValidationError | undefined => {
  return validatorSchema.validate(query, joiValidationOptions).error;
}
/**
 * Middleware to validate request query
 * @param validatorSchema Joi validatorSchema of the request query
 * @param joiValidationOptions Joi.ValidationOptions
 */
export const validateQuery = (
  validatorSchema: Joi.ObjectSchema,
  joiValidationOptions?: Partial<Joi.ValidationOptions>
) => (req: Request, _res: Response, next: NextFunction): void => {
  const { query } = req;
  const validationErrors = getQueryValidationErrors(
    validatorSchema,
    query,
    { ...commonValidatorOptions, ...joiValidationOptions }
  );
  const err: Partial<IValidateAllResponse> = {
    query: validationErrors
  }
  if (validationErrors) {
    return next(new RequestValidationMiddlewareError(err as Record<string, unknown>[]));
  }
  next();
}

/**
   * Function to get request validation errors
   * @param validatorSchema Joi.ObjectSchema
   * @param request Express request
   * @param joiValidationOptions Joi.ValidationOptions
   * @returns Joi.ValidationError | undefined
   */
const getAllValidationErrors = (
  validatorSchema: IValidateAllSchema,
  request: Request,
  joiValidationOptions?: Partial<Joi.ValidationOptions>
): IValidateAllResponse | undefined => {
  const validateAllResponse: IValidateAllResponse = {
    body: validatorSchema.body?.validate(request.body, joiValidationOptions).error,
    cookies: validatorSchema.cookies?.validate(request.cookies, joiValidationOptions).error,
    headers: validatorSchema.headers?.validate(request.headers, joiValidationOptions).error,
    params: validatorSchema.params?.validate(request.params, joiValidationOptions).error,
    query: validatorSchema.query?.validate(request.query, joiValidationOptions).error,
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
  * @param joiValidationOptions Joi.ValidationOptions
  */
export const validateAll = (
  validatorSchema: IValidateAllSchema,
  joiValidationOptions?: Partial<Joi.ValidationOptions>
) => (req: Request, res: Response, next: NextFunction): void => {
  const validateAllResponse: IValidateAllResponse | undefined = getAllValidationErrors(
    validatorSchema,
    req,
    joiValidationOptions
  );
  if (validateAllResponse) {
    return next(new RequestValidationMiddlewareError(validateAllResponse as Record<string, unknown>[]));
  }
  return next()
}