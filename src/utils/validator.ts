import { Validator } from 'node-input-validator'
import { ExceptionHttpCustom } from '../exceptions/exception'

export const requestValidator = async (body: any, rules: any) => {
  const v = new Validator(body, rules)
  const matched = await v.check()
  if (!matched) {
    throw new ExceptionHttpCustom({
      error: v.errors,
      code: 400
    })
  }
}
