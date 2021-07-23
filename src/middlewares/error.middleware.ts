import { NextFunction, Request, Response } from 'express'
import { ExceptionHttpCustom } from '../exceptions/exception'

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ExceptionHttpCustom) {
    const errorCustom = JSON.parse(err.message)
    const error = errorCustom.error
    res.status(errorCustom.code)
    return res.json({ error })
  }
  res.status(500)
  return res.json({ message: 'Internal Server Error' })
}
