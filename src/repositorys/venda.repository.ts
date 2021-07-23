import VendaEntity from '../entities/venda.entity'

interface IVendaRepository {
  /**
   * Create Venda
   * @param vendaReq
   */
  store (vendaReq: VendaEntity): Promise<VendaEntity>

  find(vendaId: number): Promise<VendaEntity | null>

  filter(clienteId: number): Promise<VendaEntity[]>

  filterLivro(livroId: number): Promise<VendaEntity[]>

  filterByLivrosIds(livrosIds: Array<number>) : Promise<VendaEntity[]>
}

class VendaRepository implements IVendaRepository {
  async filter (clienteId: number): Promise<VendaEntity[]> {
    return await VendaEntity.findAll<VendaEntity>({
      where: {
        clienteId: clienteId
      }
    })
  }

  async filterLivro (livroId: number): Promise<VendaEntity[]> {
    return await VendaEntity.findAll<VendaEntity>({
      where: {
        livroId: livroId
      }
    })
  }

  async filterByLivrosIds (livrosIds: Array<number>) : Promise<VendaEntity[]> {
    return await VendaEntity.findAll<VendaEntity>({
      where: {
        livroId: livrosIds
      }
    })
  }

  async find (vendaId: number): Promise<VendaEntity | null> {
    return await VendaEntity.findOne<VendaEntity>({
      where: {
        vendaId: vendaId
      }
    })
  }

  /**
   * Create Venda
   * @param vendaReq
   */
  async store (vendaReq: VendaEntity): Promise<VendaEntity> {
    const venda = new VendaEntity()
    venda.valor = vendaReq.valor
    venda.clienteId = vendaReq.clienteId
    venda.livroId = vendaReq.livroId
    venda.data = vendaReq.data
    return await venda.save()
  }
}

export {
  VendaRepository,
  IVendaRepository
}
