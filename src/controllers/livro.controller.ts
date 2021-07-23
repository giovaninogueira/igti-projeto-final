import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AutorRepository, IAutoRepository } from '../repositorys/autor.repository'
import { ILivroInfoRepository, LivroInfoRepository } from '../repositorys/livro-info.repository'
import { ILivroRepository, LivroRepository } from '../repositorys/livro.repository'
import { LivroService } from '../services/livro.service'
import { requestValidator } from '../utils/validator'

export class LivroController {
  /**
   * Get Livros
   * @param req
   * @param resp
   */
  async get (req: Request, resp: Response) {
    const livros = await this.instanceRepository.get()
    resp.status(200).json({
      livros
    })
  }

  /**
   * Find Livro
   * @param req
   * @param resp
   */
  async filter (req: Request, resp: Response) {
    const autorId = parseInt(req.params.autorId)
    const livro = await this.instanceRepository.filter(autorId)
    resp.status(200).json({
      livro
    })
  }

  /**
   * Find Livro
   * @param req
   * @param resp
   */
  async find (req: Request, resp: Response) {
    const id = parseInt(req.params.id)
    const livro = await this.instanceRepository.find(id)
    resp.status(200).json({
      livro
    })
  }

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
   * Delete Livro
   * @param req
   * @param resp
   */
  async delete (req: Request, resp: Response) {
    const id = parseInt(req.params.id)
    await this.instanceRepository.delete(id)
    resp.status(200).json({
      message: 'Livro deletado com sucesso!'
    })
  }

  /**
   * Get Instance livro Repository
   */
  private get instanceRepository () {
    container.registerSingleton<ILivroRepository>('LivroRepository', LivroRepository)
    container.registerSingleton<IAutoRepository>('AutorRepository', AutorRepository)
    container.registerSingleton<ILivroInfoRepository>('LivroInfoRepository', LivroInfoRepository)
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
