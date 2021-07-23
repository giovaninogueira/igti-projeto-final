import LivroEntity from '../entities/livro.entity'

interface ILivroRepository {

   /**
   * Find Livro
   * @param id
   */
  find (id: number): Promise<LivroEntity | null>;

  /**
   * Create Livro
   * @param livroReq
   */
  store (livroReq: LivroEntity): Promise<LivroEntity>

  /**
   * Update Livro
   * @param livroReq
   */
  update (livro: LivroEntity, valor: number): Promise<LivroEntity>
}

class LivroRepository implements ILivroRepository {
  /**
   * Find Livro
   * @param id
   * @returns
   */
  async find (id: number): Promise<LivroEntity | null> {
    return await LivroEntity.findOne<LivroEntity>({
      where: {
        livroId: id
      }
    })
  }

  /**
   * Create Livro
   * @param livroReq
   * @returns
   */
  async store (livroReq: LivroEntity): Promise<LivroEntity> {
    const livro = new LivroEntity()
    livro.nome = livroReq.nome
    livro.valor = livroReq.valor
    livro.estoque = livroReq.estoque
    livro.autorId = livroReq.autorId
    return await livro.save()
  }

  /**
   * Update autor
   * @param autorReq
   * @returns
   */
  async update (livro: LivroEntity, valor: number): Promise<LivroEntity> {
    livro.valor = valor
    return await livro.save()
  }
}

export {
  LivroRepository,
  ILivroRepository
}
