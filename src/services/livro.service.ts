import { inject, injectable } from 'tsyringe'
import LivroEntity from '../entities/livro.entity'
import { ExceptionHttpCustom } from '../exceptions/exception'
import { IAutoRepository } from '../repositorys/autor.repository'
import { ILivroInfoRepository } from '../repositorys/livro-info.repository'
import { ILivroRepository } from '../repositorys/livro.repository'

@injectable()
export class LivroService {
  constructor (
    @inject('LivroRepository') private livroRepository: ILivroRepository,
    @inject('AutorRepository') private autorRepository: IAutoRepository,
    @inject('LivroInfoRepository') private livroInfoRepository: ILivroInfoRepository
  ) { }

  /**
   * Get list livros
   * @returns
   */
  async get () {
    return await this.livroRepository.get()
  }

  async filter (autorId: number) {
    return await this.livroRepository.filter(autorId)
  }

  /**
   * Get list livro
   * @returns
   */
  async find (id: number) {
    const result = await this.livroRepository.find(id)
    const info = await this.livroInfoRepository.find(id)
    return {
      livroId: result?.livroId,
      nome: result?.nome,
      valor: result?.valor,
      estoque: result?.estoque,
      autorId: result?.autorId,
      info: info
    }
  }

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

  async delete (id: number) {
    const livroObj = await this.livroRepository.find(id)
    if (!livroObj) {
      throw new ExceptionHttpCustom({
        error: 'Livro não existente',
        code: 404
      })
    }
    const vendas = livroObj.vendas
    if (vendas && vendas.length) {
      throw new ExceptionHttpCustom({
        error: 'Não pode ser deletado, possui vendas',
        code: 400
      })
    }
    return await this.livroRepository.delete(livroObj)
  }
}
