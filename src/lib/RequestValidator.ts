import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { RequestValidationMiddlewareError } from "./errors/RequestValidationMiddlewareError";
import { IValidateAllResponse, IValidateAllSchema } from "./interfaces/validatorInterfaces";

class RequestValidator {
  private defaultValidationOptions: Partial<Joi.ValidationOptions>;
  private commonValidationOptions: Partial<Joi.ValidationOptions>;

  constructor(joiValidationOptions?: Partial<Joi.ValidationOptions>) {
    this.defaultValidationOptions = { abortEarly: false };
    this.commonValidationOptions = joiValidationOptions ? { ...this.defaultValidationOptions, ...joiValidationOptions } : this.defaultValidationOptions;
  }
  /**
    * Function to get request body validation errors
    * @param validatorSchema Joi.ObjectSchema
    * @param body Express request body
    * @param bodyValidationOptions Joi.ValidationOptions
    * @returns Joi.ValidationError | undefined
    */
  private getBodyValidationErrors = (
    validatorSchema: Joi.ObjectSchema,
    body,
    bodyValidationOptions?: Partial<Joi.ValidationOptions>
  ): Joi.ValidationError | undefined => {
    return validatorSchema.validate(body, bodyValidationOptions).error;
  }
  /**
 * Middleware to validate request body
 * @param validatorSchema Joi validatorSchema of the request body
 * @param bodyValidationOptions Joi.ValidationOptions
 */
  public validateBody = (
    validatorSchema: Joi.ObjectSchema,
    bodyValidationOptions?: Partial<Joi.ValidationOptions>
  ) => (req: Request, _res: Response, next: NextFunction): void => {
    const { body } = req;
    const validationErrors = this.getBodyValidationErrors(
      validatorSchema,
      body,
      { ...this.commonValidationOptions, ...bodyValidationOptions }
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
    * @param cookiesValidationOptions Joi.ValidationOptions
    * @returns Joi.ValidationError | undefined
    */
  private getCookiesValidationErrors = (
    validatorSchema: Joi.ObjectSchema,
    cookies,
    cookiesValidationOptions?: Partial<Joi.ValidationOptions>
  ): Joi.ValidationError | undefined => {
    return validatorSchema.validate(cookies, cookiesValidationOptions).error;
  }
  /**
 * Middleware to validate request cookies
 * @param validatorSchema Joi validatorSchema of the request cookies
 * @param cookiesValidationOptions Joi.ValidationOptions
 */
  public validateCookies = (
    validatorSchema: Joi.ObjectSchema,
    cookiesValidationOptions?: Partial<Joi.ValidationOptions>
  ) => (req: Request, _res: Response, next: NextFunction): void => {
    const { cookies } = req;
    const validationErrors = this.getCookiesValidationErrors(
      validatorSchema,
      cookies,
      { ...this.commonValidationOptions, ...cookiesValidationOptions }
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
    * Function to get request query validation errors
    * @param validatorSchema Joi.ObjectSchema
    * @param query Express request query
    * @param queryValidationOptions Joi.ValidationOptions
    * @returns Joi.ValidationError | undefined
    */
  private getQueryValidationErrors = (
    validatorSchema: Joi.ObjectSchema,
    query,
    queryValidationOptions?: Partial<Joi.ValidationOptions>
  ): Joi.ValidationError | undefined => {
    return validatorSchema.validate(query, queryValidationOptions).error;
  }
  /**
 * Middleware to validate request query
 * @param validatorSchema Joi validatorSchema of the request query
 * @param queryValidationOptions Joi.ValidationOptions
 */
  public validateQuery = (
    validatorSchema: Joi.ObjectSchema,
    queryValidationOptions?: Partial<Joi.ValidationOptions>
  ) => (req: Request, _res: Response, next: NextFunction): void => {
    const { query } = req;
    const validationErrors = this.getQueryValidationErrors(
      validatorSchema,
      query,
      { ...this.commonValidationOptions, ...queryValidationOptions }
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
    * Function to get request params validation errors
    * @param validatorSchema Joi.ObjectSchema
    * @param params Express request params
    * @param paramsValidationOptions Joi.ValidationOptions
    * @returns Joi.ValidationError | undefined
    */
  private getParamsValidationErrors = (
    validatorSchema: Joi.ObjectSchema,
    params,
    paramsValidationOptions?: Partial<Joi.ValidationOptions>
  ): Joi.ValidationError | undefined => {
    return validatorSchema.validate(params, paramsValidationOptions).error;
  }
  /**
 * Middleware to validate request params
 * @param validatorSchema Joi validatorSchema of the request params
 * @param paramsValidationOptions Joi.ValidationOptions
 */
  public validateParams = (
    validatorSchema: Joi.ObjectSchema,
    paramsValidationOptions?: Partial<Joi.ValidationOptions>
  ) => (req: Request, _res: Response, next: NextFunction): void => {
    const { params } = req;
    const validationErrors = this.getParamsValidationErrors(
      validatorSchema,
      params,
      { ...this.commonValidationOptions, ...paramsValidationOptions }
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
    * Function to get request headers validation errors
    * @param validatorSchema Joi.ObjectSchema
    * @param headers Express request headers
    * @param headersValidationOptions Joi.ValidationOptions
    * @returns Joi.ValidationError | undefined
    */
  private getHeadersValidationErrors = (
    validatorSchema: Joi.ObjectSchema,
    headers,
    headersValidationOptions?: Partial<Joi.ValidationOptions>
  ): Joi.ValidationError | undefined => {
    return validatorSchema.validate(headers, headersValidationOptions).error;
  }
  /**
 * Middleware to validate request headers
 * @param validatorSchema Joi validatorSchema of the request headers
 * @param headersValidationOptions Joi.ValidationOptions
 */
  public validateHeaders = (
    validatorSchema: Joi.ObjectSchema,
    headersValidationOptions?: Partial<Joi.ValidationOptions>
  ) => (req: Request, _res: Response, next: NextFunction): void => {
    const { headers } = req;
    const validationErrors = this.getHeadersValidationErrors(
      validatorSchema,
      headers,
      { ...this.commonValidationOptions, ...headersValidationOptions }
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
   * Function to get request validation errors
   * @param validatorSchema Joi.ObjectSchema
   * @param request Express request
   * @param allValidationOptions Joi.ValidationOptions
   * @returns Joi.ValidationError | undefined
   */
  private getAllValidationErrors = (
    validatorSchema: IValidateAllSchema,
    request: Request,
    allValidationOptions?: Partial<Joi.ValidationOptions>
  ): IValidateAllResponse | undefined => {
    const validateAllResponse: IValidateAllResponse = {
      body: validatorSchema.body?.validate(request.body, allValidationOptions).error,
      cookies: validatorSchema.cookies?.validate(request.cookies, allValidationOptions).error,
      headers: validatorSchema.headers?.validate(request.headers, allValidationOptions).error,
      params: validatorSchema.params?.validate(request.params, allValidationOptions).error,
      query: validatorSchema.query?.validate(request.query, allValidationOptions).error,
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
    * @param allValidationOptions Joi.ValidationOptions
    */
  public validateAll = (
    validatorSchema: IValidateAllSchema,
    allValidationOptions?: Partial<Joi.ValidationOptions>
  ) => (req: Request, res: Response, next: NextFunction): void => {
    const validateAllResponse: IValidateAllResponse | undefined = this.getAllValidationErrors(
      validatorSchema,
      req,
      { ...this.commonValidationOptions, ...allValidationOptions }
    );
    if (validateAllResponse) {
      return next(new RequestValidationMiddlewareError(validateAllResponse as Record<string, unknown>[]));
    }
    return next()
  }
}

export default RequestValidator