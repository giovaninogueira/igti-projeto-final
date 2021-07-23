export class ExceptionHttpCustom extends Error {
  constructor (custom: {error: string, code: number}) {
    super(JSON.stringify(custom))
  }
}
