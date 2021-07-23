import { Sequelize } from 'sequelize-typescript'
import { IDatabase } from '../database.interface'
import AutorEntity from '../../entities/autor.entity'
import ClienteEntity from '../../entities/cliente.entity'
import LivroEntity from '../../entities/livro.entity'
import VendaEntity from '../../entities/venda.entity'

export class SequelizeDatabase extends Sequelize implements IDatabase {
  constructor () {
    super({
      dialect: 'postgres',
      database: 'livros',
      password: '102030opa.',
      username: 'postgres',
      port: 49153,
      logging: false,
      models: [
        AutorEntity,
        ClienteEntity,
        LivroEntity,
        VendaEntity
      ]
    })
  }

  /**
   * Connect in database
   */
  async connectDB () {
    await this.sync()
  }
}

export const sequelize = new SequelizeDatabase()
