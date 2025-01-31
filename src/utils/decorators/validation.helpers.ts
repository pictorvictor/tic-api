import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import moment from 'moment';

@ValidatorConstraint({ async: false })
class IsDateOnlyConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    if (typeof value !== 'string') {
      return false;
    }
    const date = moment(value, 'YYYY-MM-DD');
    return date.isValid();
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is not a valid date. Use the format: YYYY-MM-DD`;
  }
}

function IsDateOnly(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateOnlyConstraint,
    });
  };
}


export { IsDateOnly };
