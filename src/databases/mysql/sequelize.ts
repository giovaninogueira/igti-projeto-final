import { Sequelize } from 'sequelize-typescript'
import path from 'path'
import { IDatabase } from '../database.interface'

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
        path.join(__dirname, '../../entities')
      ]
    })
  }

  /**
   * Connect in database
   */
  async connect () {
    await this.sync()
  }
}

export const sequelize = new SequelizeDatabase()
