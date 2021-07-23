import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AutorRepository, IAutoRepository } from '../repositorys/autor.repository'
import { AutorService } from '../services/autor.service'
import { requestValidator } from '../utils/validator'

export class AutorController {
  /**
   * Create cliente
   * @param req
   * @param resp
   */
  async find (req: Request, resp: Response) {
    const id = parseInt(req.params.id)
    const autor = await this.instanceRepository.find(id)
    resp.status(200).json({
      autor
    })
  }

  /**
   * Get Clientes
   * @param req
   * @param resp
   */
  async get (req: Request, resp: Response) {
    const autores = await this.instanceRepository.get()
    resp.status(200).json({ autores })
  }

  /**
   * Create autor
   * @param req
   * @param resp
   */
  async store (req: Request, resp: Response) {
    await this.validateAutor(req.body)
    const autor = await this.instanceRepository.store(req.body)
    resp.status(201).json({
      message: 'Autor Cadastrado com sucesso!',
      data: autor
    })
  }

  /**
   * Update Autor
   * @param req
   * @param resp
   */
  async update (req: Request, resp: Response) {
    const id = parseInt(req.params.id)
    await this.validateAutor(req.body)
    const autor = await this.instanceRepository.update(id, req.body)
    resp.status(200).json({
      message: 'Autor atualizado com sucesso!',
      data: autor
    })
  }

  /**
   * Delete Autor
   * @param req
   * @param resp
   */
  async delete (req: Request, resp: Response) {
    const id = parseInt(req.params.id)
    await this.instanceRepository.delete(id)
    resp.status(200).json({
      message: 'Autor deletado com sucesso!'
    })
  }

  /**
   * Get Instance autor Repository
   */
  private get instanceRepository () {
    container.registerSingleton<IAutoRepository>('AutorRepository', AutorRepository)
    return container.resolve(AutorService)
  }

  private async validateAutor (body: any) {
    await requestValidator(body, {
      nome: 'required|string',
      email: 'required|email',
      telefone: 'required|string'
    })
  }
}
