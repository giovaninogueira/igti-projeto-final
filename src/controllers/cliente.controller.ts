import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ClienteRepository, IClienteRepository } from '../repositorys/cliente.repository'
import { ClienteService } from '../services/cliente.service'
import { requestValidator } from '../utils/validator'

export class ClienteController {
  async store (req: Request, resp: Response) {
    await requestValidator(req.body, {
      email: 'required|email',
      password: 'required'
    })
    await this.instanceRepository.store()
    resp.status(201).json({
      message: 'Cliente Cadastrado com sucesso!'
    })
  }

  /**
   * Get Instance cliente Repository
   */
  private get instanceRepository () {
    container.registerSingleton<IClienteRepository>('ClienteRepository', ClienteRepository)
    return container.resolve(ClienteService)
  }
}
