import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ClienteRepository, IClienteRepository } from '../repositorys/cliente.repository'
import { ClienteService } from '../services/cliente.service'
import { requestValidator } from '../utils/validator'

export class AuthController {
  /**
   * Login cliente
   * @param req
   * @param resp
   */
  async login (req: Request, resp: Response) {
    await this.validateLogin(req.body)
    const { email, password } = req.body
    if (email !== 'admin' || password !== 'desafio-igti-nodejs') {
      await this.instanceRepository.login(email, password)
    }
    resp.status(200).json({
      message: 'Login com sucesso'
    })
  }

  /**
   * Get Instance cliente Repository
   */
  private get instanceRepository () {
    container.registerSingleton<IClienteRepository>('ClienteRepository', ClienteRepository)
    return container.resolve(ClienteService)
  }

  private async validateLogin (body: any) {
    await requestValidator(body, {
      email: 'required',
      password: 'required'
    })
  }
}
