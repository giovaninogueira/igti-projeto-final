import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ILivroInfoRepository, LivroInfoRepository } from '../repositorys/livro-info.repository'
import { ILivroRepository, LivroRepository } from '../repositorys/livro.repository'
import { LivroInfoService } from '../services/livro-info.service'
import { requestValidator } from '../utils/validator'

export class LivroInfoController {
  /**
   * Create Livro
   * @param req
   * @param resp
   */
  async store (req: Request, resp: Response) {
    await this.validateLivro(req.body)
    await this.instanceRepository.store(req.body)
    resp.status(200).json({
      message: 'Informação do Livro Cadastrado com sucesso!'
    })
  }

  /**
   * Create Livro
   * @param req
   * @param resp
   */
  async addAvaliacao (req: Request, resp: Response) {
    const id = parseInt(req.params.id)
    await requestValidator(req.body, {
      nome: 'required|string',
      nota: 'required|integer',
      avaliacao: 'required|string'
    })
    await this.instanceRepository.addAvaliacao(id, req.body)
    resp.status(201).json({
      message: 'Adicionado avaliação com sucesso!'
    })
  }

  /**
   * Create Livro
   * @param req
   * @param resp
   */
  async removeAvaliacao (req: Request, resp: Response) {
    const id = parseInt(req.params.id)
    const index = parseInt(req.params.index)
    await this.instanceRepository.removeAvaliacao(id, index)
    resp.status(200).json({
      message: 'Removida avaliação com sucesso!'
    })
  }

  /**
   * Create Livro
   * @param req
   * @param resp
   */
  async delete (req: Request, resp: Response) {
    const id = parseInt(req.params.id)
    await this.instanceRepository.delete(id)
    resp.status(201).json({
      message: 'Informação do Livro Deletada com sucesso!'
    })
  }

  /**
   * Get Instance livro Repository
   */
  private get instanceRepository () {
    container.registerSingleton<ILivroInfoRepository>('LivroInfoRepository', LivroInfoRepository)
    container.registerSingleton<ILivroRepository>('LivroRepository', LivroRepository)
    return container.resolve(LivroInfoService)
  }

  private async validateLivro (body: any) {
    await requestValidator(body, {
      livroId: 'required|integer',
      descricao: 'required|string',
      paginas: 'required|integer',
      editora: 'required|string'
      // avaliacoes: 'required|array',
      // 'avaliacoes.*.nome': 'required|string',
      // 'avaliacoes.*.nota': 'required|integer',
      // 'avaliacoes.*.avaliacao': 'required|string'
    })
  }
}
