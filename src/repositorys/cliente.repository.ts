import ClienteEntity from '../entities/cliente.entity'

interface IClienteRepository {
  store (clienteReq: ClienteEntity): Promise<ClienteEntity>
}

class ClienteRepository implements IClienteRepository {
  /**
     * Create Cliente
     * @param clienteReq
     */
  async store (clienteReq: ClienteEntity): Promise<ClienteEntity> {
    // const cliente = new ClienteEntity()
    // cliente.nome = clienteReq.nome
    // cliente.email = clienteReq.email
    // cliente.senha = clienteReq.senha
    // cliente.telefone = clienteReq.telefone
    // cliente.endereco = clienteReq.endereco
    console.log('oii')
    return new ClienteEntity()
  }
}

export {
  ClienteRepository,
  IClienteRepository
}
