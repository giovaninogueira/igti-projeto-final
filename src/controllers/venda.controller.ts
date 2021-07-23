import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ClienteRepository, IClienteRepository } from '../repositorys/cliente.repository'
import { ILivroRepository, LivroRepository } from '../repositorys/livro.repository'
import { IVendaRepository, VendaRepository } from '../repositorys/venda.repository'
import { VendaService } from '../services/venda.service'
import { requestValidator } from '../utils/validator'

export class VendaController {
  /**
   * Get Cliente
   * @param req
   * @param resp
   */
  async find (req: Request, resp: Response) {
    const id = parseInt(req.params.id)
    const vendas = await this.instanceRepository.find(id)
    resp.status(200).json({ vendas })
  }

  /**
   * filter Cliente
   * @param req
   * @param resp
   */
  async filter (req: Request, resp: Response) {
    const clienteId = parseInt(req.params.clienteId)
    const vendas = await this.instanceRepository.filter(clienteId)
    resp.status(200).json({ vendas })
  }

  async filterLivro (req: Request, resp: Response) {
    const livroId = parseInt(req.params.livroId)
    const vendas = await this.instanceRepository.filterLivro(livroId)
    resp.status(200).json({ vendas })
  }

  async filterAutor (req: Request, resp: Response) {
    const autorId = parseInt(req.params.autorId)
    const vendas = await this.instanceRepository.filterAutor(autorId)
    resp.status(200).json({ vendas })
  }

  async filterCliente (req: Request, resp: Response) {
    const clienteId = parseInt(req.body.clienteId)
    const vendas = await this.instanceRepository.filter(clienteId)
    resp.status(200).json({ vendas })
  }

  /**
   * Get Cliente
   * @param req
   * @param resp
   */
  async get (req: Request, resp: Response) {
    const clienteId = parseInt(req.body.clienteId)
    const vendas = await this.instanceRepository.get(clienteId)
    resp.status(200).json({ vendas })
  }

  /**
   * Update Cliente
   * @param req
   * @param resp
   */
  async store (req: Request, resp: Response) {
    await this.validateCliente(req.body)
    req.body.clienteId = parseInt(req.body.clienteId)
    const venda = await this.instanceRepository.store(req.body)
    resp.status(200).json({
      message: 'Venda realizada com sucesso!',
      data: venda
    })
  }

  /**
   * Get Instance cliente Repository
   */
  private get instanceRepository () {
    container.registerSingleton<IVendaRepository>('VendaRepository', VendaRepository)
    container.registerSingleton<ILivroRepository>('LivroRepository', LivroRepository)
    container.registerSingleton<IClienteRepository>('ClienteRepository', ClienteRepository)
    return container.resolve(VendaService)
  }

  private async validateCliente (body: any) {
    await requestValidator(body, {
      data: 'required|date',
      livroId: 'required|integer',
      valor: 'required|decimal'
    })
  }
}
