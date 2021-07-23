import sequelize from 'sequelize'
import AutorEntity from '../entities/autor.entity'

interface IAutoRepository {

  /**
   * List Autores
   * @param id
   */
  get (): Promise<AutorEntity[]>;

  /**
   * Find Autor
   * @param id
   */
  find (id: number): Promise<AutorEntity | null>;

  /**
   * Create Autor
   * @param autorReq
   */
  store (autorReq: AutorEntity): Promise<AutorEntity>

  /**
   * Update Autor
   * @param autor
   * @param autorReq
   */
  update (autor: AutorEntity, autorReq: AutorEntity): Promise<AutorEntity>

  /**
   * Delete Autor
   * @param autor
   * @returns
   */
  delete(autor: AutorEntity): Promise<void>

  /**
   * Exists e-mail
   * @param email
   * @param id
   * @returns
   */
  existsEmail(email: string, id: number): Promise<AutorEntity | null>
}

class AutorRepository implements IAutoRepository {
  /**
   * Get
   * @returns
   */
  async get (): Promise<AutorEntity[]> {
    return await AutorEntity.findAll<AutorEntity>()
  }

  /**
   * Find autor
   * @param id
   * @returns
   */
  async find (id: number): Promise<AutorEntity | null> {
    return await AutorEntity.findOne<AutorEntity>({
      where: {
        autorId: id
      }
    })
  }

  /**
   * Create autor
   * @param autorReq
   * @returns
   */
  async store (autorReq: AutorEntity): Promise<AutorEntity> {
    const autor = new AutorEntity()
    autor.nome = autorReq.nome
    autor.email = autorReq.email
    autor.telefone = autorReq.telefone
    return await autor.save()
  }

  /**
   * Update autor
   * @param autorReq
   * @returns
   */
  async update (autor: AutorEntity, autorReq: AutorEntity): Promise<AutorEntity> {
    autor.nome = autorReq.nome
    autor.email = autorReq.email
    autor.telefone = autorReq.telefone
    return await autor.save()
  }

  /**
   * Delete autor
   * @param autor
   * @returns
   */
  async delete (autor: AutorEntity): Promise<void> {
    return await autor.destroy()
  }

  /**
   * Exists e-mail
   * @param email
   * @param id
   * @returns
   */
  async existsEmail (email: string, id: number = 0): Promise<AutorEntity | null> {
    return await AutorEntity.findOne({
      where: {
        autorId: {
          [sequelize.Op.not]: id
        },
        email: email
      }
    })
  }
}

export {
  AutorRepository,
  IAutoRepository
}
