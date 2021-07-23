import { inject, injectable } from 'tsyringe'
import VendaEntity from '../entities/venda.entity'
import { ExceptionHttpCustom } from '../exceptions/exception'
import { IClienteRepository } from '../repositorys/cliente.repository'
import { ILivroRepository } from '../repositorys/livro.repository'
import { IVendaRepository } from '../repositorys/venda.repository'

@injectable()
export class VendaService {
  constructor (
      @inject('VendaRepository') private vendaRepository: IVendaRepository,
      @inject('LivroRepository') private livroRepository: ILivroRepository,
      @inject('ClienteRepository') private clienteRepository: IClienteRepository
  ) { }

  /**
   * Get Autor
   * @param autor
   * @returns
   */
  async find (vendaId: number) {
    return await this.vendaRepository.find(vendaId)
  }

  /**
   * Get Autor
   * @param autor
   * @returns
   */
  async filter (clienteId: number) {
    return await this.vendaRepository.filter(clienteId)
  }

  async filterLivro (livroId: number) {
    return await this.vendaRepository.filterLivro(livroId)
  }

  async filterAutor (autorId: number) {
    const livros = await this.livroRepository.filter(autorId)
    const livrosIds = livros.map(({ livroId }) => livroId)
    return await this.vendaRepository.filterByLivrosIds(livrosIds)
  }

  /**
   * Get Autor
   * @param autor
   * @returns
   */
  async get (clienteId: number) {
    const cliente = await this.clienteRepository.find(clienteId)
    return cliente?.vendas
  }

  /**
   * Create Autor
   * @param autor
   * @returns
   */
  async store (venda: VendaEntity) {
    const livro = await this.livroRepository.find(venda.livroId)
    if (!livro) {
      throw new ExceptionHttpCustom({
        error: 'Livro Não encontrado',
        code: 400
      })
    }
    if (livro.estoque <= 0) {
      throw new ExceptionHttpCustom({
        error: 'Sem estoque',
        code: 400
      })
    }
    const cliente = await this.clienteRepository.find(venda.clienteId)
    if (!cliente) {
      throw new ExceptionHttpCustom({
        error: 'Cliente Não encontrado',
        code: 400
      })
    }
    return await this.vendaRepository.store(venda)
  }
}
