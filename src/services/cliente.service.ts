import { inject, injectable } from 'tsyringe'
import ClienteEntity from '../entities/cliente.entity'
import { IClienteRepository } from '../repositorys/cliente.repository'

@injectable()
export class ClienteService {
  constructor (@inject('ClienteRepository') private clienteRepository: IClienteRepository) {}

  async store () {
    return this.clienteRepository.store(new ClienteEntity())
  }
}
