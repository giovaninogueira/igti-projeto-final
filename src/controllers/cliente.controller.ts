import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ClienteRepository, IClienteRepository } from '../repositorys/cliente.repository'
import { ClienteService } from '../services/cliente.service'
import { requestValidator } from '../utils/validator'

export class ClienteController {
  /**
   * Create cliente
   * @param req
   * @param resp
   */
  async find (req: Request, resp: Response) {
    const id = parseInt(req.params.id)
    const cliente = await this.instanceRepository.find(id)
    resp.status(201).json({
      cliente
    })
  }

  /**
   * Create cliente
   * @param req
   * @param resp
   */
  async store (req: Request, resp: Response) {
    await this.validateCliente(req.body)
    const cliente = await this.instanceRepository.store(req.body)
    resp.status(201).json({
      message: 'Cliente Cadastrado com sucesso!',
      data: cliente
    })
  }

  async get (req: Request, resp: Response) {
    const clientes = await this.instanceRepository.get()
    resp.status(201).json({
      clientes: clientes
    })
  }

  /**
   * Update Cliente
   * @param req
   * @param resp
   */
  async update (req: Request, resp: Response) {
    const id = parseInt(req.params.id)
    await this.validateCliente(req.body)
    const cliente = await this.instanceRepository.update(id, req.body)
    resp.status(200).json({
      message: 'Cliente atualizado com sucesso!',
      data: cliente
    })
  }

  /**
   * Delete cliente
   * @param req
   * @param resp
   */
  async delete (req: Request, resp: Response) {
    const id = parseInt(req.params.id)
    await this.instanceRepository.delete(id)
    resp.status(200).json({
      message: 'Cliente deletado com sucesso!'
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
