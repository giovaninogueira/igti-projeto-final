import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import { ExceptionHttpCustom } from '../exceptions/exception'
import { ClienteRepository, IClienteRepository } from '../repositorys/cliente.repository'
import { ClienteService } from '../services/cliente.service'

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    throw new ExceptionHttpCustom({
      error: 'Não permitido',
      code: 401
    })
  }
  container.registerSingleton<IClienteRepository>('ClienteRepository', ClienteRepository)
  const instanceRepository = container.resolve(ClienteService)

  const [, auth] = req.headers.authorization.split(' ')
  const credentials = Buffer.from(auth, 'base64').toString('ascii')
  const [username, password] = credentials.split(':')
  if (username !== 'admin' || password !== 'desafio-igti-nodejs') {
    const { clienteId } = await instanceRepository.login(username, password)
    req.body.clienteId = clienteId
  }
  next()
}
