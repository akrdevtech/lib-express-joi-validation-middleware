import Joi from "joi";

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