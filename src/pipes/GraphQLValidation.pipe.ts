import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { UserInputError } from 'apollo-server-express'

@Injectable()
export class GraphQLValidationPipe<T> implements PipeTransform<T> {
  public async transform(value: T, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      const message = errors
        .map(validationError => Object.values(validationError.constraints))
        .flat()
        .join('; ')
      throw new UserInputError(message)
    }
    return value
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
