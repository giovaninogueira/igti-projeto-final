import LivroInfoEntity, { ILivroInfoEntity } from '../entities/livro-info.entity'

interface ILivroInfoRepository {

  /**
   * Livro find
   * @param livroId
   */
  find(livroId: number): Promise<ILivroInfoEntity | null>

  /**
   * delete find
   * @param livroId
   */
   delete(livroId: number): Promise<void>

  /**
   * Criar info de livro
   * @param livroReq
   * @returns
   */
  store (livroReq: ILivroInfoEntity): Promise<ILivroInfoEntity>

  /**
   * Update info de livro
   * @param livroReq
   * @returns
   */
   update (livroReq: ILivroInfoEntity): Promise<any>

   addAvaliacao (livroReq: ILivroInfoEntity, avaliacao: {
    nome: string,
    nota: number,
    avaliacao: string
  }):Promise<any>

  updateAvaliacao (livroReq: ILivroInfoEntity):Promise<any>
}

class LivroInfoRepository implements ILivroInfoRepository {
  /**
   * Find info de livro
   * @param livroId
   * @returns
   */
  async find (livroId: number): Promise<ILivroInfoEntity | null> {
    return await LivroInfoEntity.findOne({
      livroId: livroId
    })
  }

  /**
   * Criar info de livro
   * @param livroReq
   * @returns
   */
  async store (livroReq: ILivroInfoEntity): Promise<ILivroInfoEntity> {
    const livro = new LivroInfoEntity({
      livroId: livroReq.livroId,
      descricao: livroReq.descricao,
      paginas: livroReq.paginas,
      editora: livroReq.editora,
      avaliacoes: []
    })
    return await livro.save()
  }

  async delete (livroId: number): Promise<void> {
    await LivroInfoEntity.deleteOne({
      livroId: livroId
    })
  }

  async addAvaliacao (livroReq: ILivroInfoEntity, avaliacao: {
    nome: string,
    nota: number,
    avaliacao: string
  }):Promise<any> {
    livroReq.avaliacoes.push(avaliacao)
    return await LivroInfoEntity.updateOne({
      livroId: livroReq.livroId
    }, {
      avaliacoes: livroReq.avaliacoes
    })
  }

  async updateAvaliacao (livroReq: ILivroInfoEntity):Promise<any> {
    return await LivroInfoEntity.updateOne({
      livroId: livroReq.livroId
    }, {
      avaliacoes: livroReq.avaliacoes
    })
  }

  /**
   * update info de livro
   * @param livroReq
   * @returns
   */
  async update (livroReq: ILivroInfoEntity): Promise<any> {
    return await LivroInfoEntity.updateOne({
      livroId: livroReq.livroId
    }, {
      livroId: livroReq.livroId,
      descricao: livroReq.descricao,
      paginas: livroReq.paginas,
      editora: livroReq.editora,
      avaliacoes: []
    })
  }
}

export {
  LivroInfoRepository,
  ILivroInfoRepository
}
