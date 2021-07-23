import LivroEntity from '../entities/livro.entity'

interface ILivroRepository {

   /**
   * Get Livro
   */
    get (): Promise<LivroEntity[]>;

   /**
   * Find Livro
   * @param id
   */
  find (id: number): Promise<LivroEntity | null>;

  /**
   * filter Livro
   */
   filter (autorId: number): Promise<LivroEntity[]>;

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

  delete (livro: LivroEntity): Promise<void>
}

class LivroRepository implements ILivroRepository {
  /**
   * Find Livro
   * @param id
   * @returns
   */
  async get (): Promise<LivroEntity[]> {
    return await LivroEntity.findAll()
  }

  /**
   * filter Livro
   * @param id
   * @returns
   */
  async filter (autorId: number): Promise<LivroEntity[]> {
    return await LivroEntity.findAll({
      where: {
        autorId: autorId
      }
    })
  }

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

  /**
   * Delete livro
   * @param autor
   * @returns
   */
  async delete (livro: LivroEntity): Promise<void> {
    return await livro.destroy()
  }
}

export {
  LivroRepository,
  ILivroRepository
}
