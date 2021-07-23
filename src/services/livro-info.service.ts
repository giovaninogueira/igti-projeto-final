import { inject, injectable } from 'tsyringe'
import { ILivroInfoEntity } from '../entities/livro-info.entity'
import { ExceptionHttpCustom } from '../exceptions/exception'
import { ILivroInfoRepository } from '../repositorys/livro-info.service'
import { ILivroRepository } from '../repositorys/livro.repository'

@injectable()
export class LivroInfoService {
  constructor (
    @inject('LivroInfoRepository') private livroInfoRepository: ILivroInfoRepository,
    @inject('LivroRepository') private livroRepository: ILivroRepository
  ) { }

  async find (livroId: number) {
    await this.existsLivro(livroId)
    return await this.livroInfoRepository.find(livroId)
  }

  async delete (livroId: number) {
    await this.existsLivro(livroId)
    return await this.livroInfoRepository.delete(livroId)
  }

  async store (livro: ILivroInfoEntity) {
    await this.existsLivro(livro.livroId)
    const livroMongo = await this.find(livro.livroId)
    if (livroMongo) {
      return await this.livroInfoRepository.update(livro)
    }
    return await this.livroInfoRepository.store(livro)
  }

  async addAvaliacao (livroId: number, avaliacao: {
    nome: string,
    nota: number,
    avaliacao: string
  }) {
    await this.existsLivro(livroId)
    const livroMongo = await this.find(livroId)
    if (livroMongo) {
      return await this.livroInfoRepository.addAvaliacao(livroMongo, avaliacao)
    }
    throw new ExceptionHttpCustom({
      error: 'Livro não encontrado',
      code: 404
    })
  }

  async removeAvaliacao (livroId: number, index: number) {
    await this.existsLivro(livroId)
    const livroMongo = await this.find(livroId)
    if (!livroMongo) {
      throw new ExceptionHttpCustom({
        error: 'Livro não encontrado',
        code: 404
      })
    }
    if (!livroMongo.avaliacoes[index]) {
      throw new ExceptionHttpCustom({
        error: 'Index não encontrado',
        code: 404
      })
    }
    livroMongo.avaliacoes.splice(index, 1)
    await this.livroInfoRepository.updateAvaliacao(livroMongo)
  }

  async existsLivro (livroId: number) {
    const livroObj = await this.livroRepository.find(livroId)
    if (!livroObj) {
      throw new ExceptionHttpCustom({
        error: 'Livro não existente',
        code: 404
      })
    }
  }
}
