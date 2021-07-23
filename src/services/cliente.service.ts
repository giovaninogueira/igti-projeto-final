import { inject, injectable } from 'tsyringe'
import ClienteEntity from '../entities/cliente.entity'
import { IClienteRepository } from '../repositorys/cliente.repository'
import { hash, compare } from 'bcryptjs'
import { ExceptionHttpCustom } from '../exceptions/exception'

@injectable()
export class ClienteService {
  constructor (@inject('ClienteRepository') private clienteRepository: IClienteRepository) { }

  async login (email: string, password: string) {
    const cliente = await this.clienteRepository.filter(email)
    if (!cliente) {
      throw new ExceptionHttpCustom({
        error: 'E-mail or password invalid',
        code: 400
      })
    }
    const passwordMatch = await compare(password, cliente.senha)

    if (!passwordMatch) {
      throw new ExceptionHttpCustom({
        error: 'E-mail or password invalid',
        code: 400
      })
    }
    return cliente
  }

  /**
   * Get list clientes
   * @returns
   */
  async find (id: number) {
    return await this.clienteRepository.find(id)
  }

  /**
   * Get list clientes
   * @returns
   */
  async get () {
    return await this.clienteRepository.get()
  }

  /**
   * Create Cliente
   * @param cliente
   * @returns
   */
  async store (cliente: ClienteEntity) {
    const exists = await this.clienteRepository.existsEmail(cliente.email, 0)
    if (exists) {
      throw new ExceptionHttpCustom({
        error: 'E-mail exists',
        code: 400
      })
    }
    cliente.senha = await hash(cliente.senha, 8)
    return await this.clienteRepository.store(cliente)
  }

  /**
   * Update Cliente
   * @param cliente
   * @returns
   */
  async update (id: number, cliente: ClienteEntity) {
    const clienteObj = await this.clienteRepository.find(id)
    if (!clienteObj) {
      throw new ExceptionHttpCustom({
        error: 'Cliente não existente',
        code: 404
      })
    }
    cliente.senha = await hash(cliente.senha, 8)
    return await this.clienteRepository.update(clienteObj, cliente)
  }

  async delete (id: number) {
    const clienteObj = await this.clienteRepository.find(id)
    if (!clienteObj) {
      throw new ExceptionHttpCustom({
        error: 'Cliente não existente',
        code: 404
      })
    }
    const vendas = await clienteObj.vendas
    if (vendas && vendas.length) {
      throw new ExceptionHttpCustom({
        error: 'Não pode ser deletado, possui vendas',
        code: 400
      })
    }
    return await this.clienteRepository.delete(clienteObj)
  }
}
