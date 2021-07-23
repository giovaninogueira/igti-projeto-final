import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AutorRepository, IAutoRepository } from '../repositorys/autor.repository'
import { ILivroRepository, LivroRepository } from '../repositorys/livro.repository'
import { LivroService } from '../services/livro.service'
import { requestValidator } from '../utils/validator'

export class LivroController {
  /**
   * Create Livro
   * @param req
   * @param resp
   */
  async store (req: Request, resp: Response) {
    await this.validateLivro(req.body)
    const cliente = await this.instanceRepository.store(req.body)
    resp.status(201).json({
      message: 'Livro Cadastrado com sucesso!',
      data: cliente
    })
  }

  /**
   * Update Cliente
   * @param req
   * @param resp
   */
  async update (req: Request, resp: Response) {
    const id = parseInt(req.params.id)
    await requestValidator(req.body, {
      valor: 'required|decimal'
    })
    const { valor } = req.body
    const cliente = await this.instanceRepository.update(id, valor)
    resp.status(200).json({
      message: 'Livro atualizado com sucesso!',
      data: cliente
    })
  }

  /**
   * Get Instance livro Repository
   */
  private get instanceRepository () {
    container.registerSingleton<ILivroRepository>('LivroRepository', LivroRepository)
    container.registerSingleton<IAutoRepository>('AutorRepository', AutorRepository)
    return container.resolve(LivroService)
  }

  private async validateLivro (body: any) {
    await requestValidator(body, {
      nome: 'required|string',
      valor: 'required|decimal',
      estoque: 'required|integer',
      autorId: 'required|integer'
    })
  }
}
