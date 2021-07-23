import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ClienteRepository, IClienteRepository } from '../repositorys/cliente.repository'
import { ClienteService } from '../services/cliente.service'
import { requestValidator } from '../utils/validator'

export class ProfileController {
  /**
   * Update Cliente
   * @param req
   * @param resp
   */
  async update (req: Request, resp: Response) {
    await this.validateCliente(req.body)
    const cliente = await this.instanceRepository.update(req.body.clienteId, req.body)
    resp.status(200).json({
      message: 'Cadastro atualizado com sucesso!',
      data: cliente
    })
  }

  /**
   * Get Instance cliente Repository
   */
  private get instanceRepository () {
    container.registerSingleton<IClienteRepository>('ClienteRepository', ClienteRepository)
    return container.resolve(ClienteService)
  }

  private async validateCliente (body: any) {
    await requestValidator(body, {
      nome: 'required|string',
      email: 'required|email',
      senha: 'required',
      telefone: 'required|string',
      endereco: 'required|string'
    })
  }
}
