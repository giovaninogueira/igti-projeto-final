import { NextFunction, Request, Response } from 'express'
import { ExceptionHttpCustom } from '../exceptions/exception'

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    throw new ExceptionHttpCustom({
      error: 'Não permitido',
      code: 401
    })
  }
  const [, auth] = req.headers.authorization.split(' ')
  const credentials = Buffer.from(auth, 'base64').toString('ascii')
  const [username, password] = credentials.split(':')
  if (username !== 'admin' || password !== 'desafio-igti-nodejs') {
    throw new ExceptionHttpCustom({
      error: 'Não permitido',
      code: 401
    })
  }
  next()
}
