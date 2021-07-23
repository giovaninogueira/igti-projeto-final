import { inject, injectable } from 'tsyringe'
import LivroEntity from '../entities/livro.entity'
import { ExceptionHttpCustom } from '../exceptions/exception'
import { IAutoRepository } from '../repositorys/autor.repository'
import { ILivroRepository } from '../repositorys/livro.repository'

@injectable()
export class LivroService {
  constructor (
    @inject('LivroRepository') private livroRepository: ILivroRepository,
    @inject('AutorRepository') private autorRepository: IAutoRepository
  ) { }

  /**
   * Create Autor
   * @param autor
   * @returns
   */
  async store (livro: LivroEntity) {
    const autor = await this.autorRepository.find(livro.autorId)
    if (!autor) {
      throw new ExceptionHttpCustom({
        error: 'Autor não encontrado',
        code: 400
      })
    }
    return await this.livroRepository.store(livro)
  }

  /**
   * Update Livro
   * @param cliente
   * @returns
   */
  async update (id: number, valor: number) {
    const livroObj = await this.livroRepository.find(id)
    if (!livroObj) {
      throw new ExceptionHttpCustom({
        error: 'Livro não existente',
        code: 404
      })
    }
    return await this.livroRepository.update(livroObj, valor)
  }
}
