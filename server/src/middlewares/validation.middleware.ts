import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { FieldsInvalidError } from "../errors/fields.error";

type ValidationErrorInfo = {
  values: any[];
  properties: string[];
  constraints: any[];
};

const buildAdditionalInfo = (errors: ValidationError[]) => {
  const args: ValidationErrorInfo = {
    values: [],
    properties: [],
    constraints: [],
  };

  errors.forEach((err) => {
    args.values.push(err.value);
    args.properties.push(err.property);
    args.constraints.push(err.constraints);
  });

  return args;
};

export default function validationMiddleware(
  validateSchema: any,
  skipMissingProperties: boolean
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const classCreated = plainToInstance(validateSchema, req.body);
    validate(classCreated, {
      skipMissingProperties: skipMissingProperties,
      stopAtFirstError: true,
    }).then((errors) => {
      if (errors.length === 0) return next();

      return next(new FieldsInvalidError(buildAdditionalInfo(errors)));
    });
  };
}
