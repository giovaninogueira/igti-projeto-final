import sequelize from 'sequelize'
import ClienteEntity from '../entities/cliente.entity'

interface IClienteRepository {

  /**
   * List Clientes
   * @param id
   */
  get (): Promise<ClienteEntity[]>;

  /**
   * Find Cliente
   * @param id
   */
  find (id: number): Promise<ClienteEntity | null>;

  /**
   * Filter Cliente
   * @param id
   */
   filter (email: string): Promise<ClienteEntity | null>;

  /**
   * Create Cliente
   * @param clienteReq
   */
  store (clienteReq: ClienteEntity): Promise<ClienteEntity>

  /**
   * Update Cliente
   * @param cliente
   * @param clienteReq
   */
  update (cliente: ClienteEntity, clienteReq: ClienteEntity): Promise<ClienteEntity>

  /**
   * Delete cliente
   * @param cliente
   * @returns
   */
  delete(cliente: ClienteEntity): Promise<void>

  /**
   * Exists e-mail
   * @param email
   * @param id
   * @returns
   */
  existsEmail(email: string, id: number): Promise<ClienteEntity | null>
}

class ClienteRepository implements IClienteRepository {
  async get (): Promise<ClienteEntity[]> {
    return await ClienteEntity.findAll<ClienteEntity>({
      attributes: {
        exclude: ['senha']
      }
    })
  }

  /**
   * Find Cliente
   * @param id
   * @returns
   */
  async find (id: number): Promise<ClienteEntity | null> {
    return await ClienteEntity.findOne<ClienteEntity>({
      where: {
        clienteId: id
      }
    })
  }

  /**
   * Filter Cliente
   * @param id
   * @returns
   */
  async filter (email: string): Promise<ClienteEntity | null> {
    return await ClienteEntity.findOne<ClienteEntity>({
      where: {
        email: email
      }
    })
  }

  /**
   * Create Cliente
   * @param clienteReq
   * @returns
   */
  async store (clienteReq: ClienteEntity): Promise<ClienteEntity> {
    const cliente = new ClienteEntity()
    cliente.nome = clienteReq.nome
    cliente.email = clienteReq.email
    cliente.senha = clienteReq.senha
    cliente.telefone = clienteReq.telefone
    cliente.endereco = clienteReq.endereco
    return await cliente.save()
  }

  /**
   * Update Cliente
   * @param clienteReq
   * @returns
   */
  async update (cliente: ClienteEntity, clienteReq: ClienteEntity): Promise<ClienteEntity> {
    cliente.nome = clienteReq.nome
    cliente.email = clienteReq.email
    cliente.senha = clienteReq.senha
    cliente.telefone = clienteReq.telefone
    cliente.endereco = clienteReq.endereco
    return await cliente.save()
  }

  /**
   * Delete cliente
   * @param cliente
   * @returns
   */
  async delete (cliente: ClienteEntity): Promise<void> {
    return await cliente.destroy()
  }

  /**
   * Exists e-mail
   * @param email
   * @param id
   * @returns
   */
  async existsEmail (email: string, id: number = 0): Promise<ClienteEntity | null> {
    return await ClienteEntity.findOne({
      where: {
        clienteId: {
          [sequelize.Op.not]: id
        },
        email: email
      }
    })
  }
}

export {
  ClienteRepository,
  IClienteRepository
}
