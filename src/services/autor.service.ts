import { inject, injectable } from 'tsyringe'
import AutorEntity from '../entities/autor.entity'
import { ExceptionHttpCustom } from '../exceptions/exception'
import { IAutoRepository } from '../repositorys/autor.repository'

@injectable()
export class AutorService {
  constructor (@inject('AutorRepository') private autorRepository: IAutoRepository) { }

  /**
   * Get list autores
   * @returns
   */
  async find (id: number) {
    return await this.autorRepository.find(id)
  }

  /**
   * Get list autores
   * @returns
   */
  async get () {
    return await this.autorRepository.get()
  }

  /**
   * Create Autor
   * @param autor
   * @returns
   */
  async store (autor: AutorEntity) {
    const exists = await this.autorRepository.existsEmail(autor.email, 0)
    if (exists) {
      throw new ExceptionHttpCustom({
        error: 'E-mail exists',
        code: 400
      })
    }
    return await this.autorRepository.store(autor)
  }

  /**
   * Update autor
   * @param autor
   * @returns
   */
  async update (id: number, autor: AutorEntity) {
    const autorObj = await this.autorRepository.find(id)
    if (!autorObj) {
      throw new ExceptionHttpCustom({
        error: 'Autor não existente',
        code: 404
      })
    }
    return await this.autorRepository.update(autorObj, autor)
  }

  async delete (id: number) {
    const autorObj = await this.autorRepository.find(id)
    if (!autorObj) {
      throw new ExceptionHttpCustom({
        error: 'Autor não existente',
        code: 404
      })
    }
    const livros = autorObj.livros
    if (livros && livros.length) {
      throw new ExceptionHttpCustom({
        error: 'Não pode ser deletado, possui livros',
        code: 400
      })
    }
    return await this.autorRepository.delete(autorObj)
  }
}
