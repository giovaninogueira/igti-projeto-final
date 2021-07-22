import { sequelize } from './databases/mysql/sequelize'
import express from 'express'
import router from './routes/route.router'

class App {
  /**
   * Init Application
   * @returns
   */
  async init () {
    await this.connectDBs()
    return this.server()
  }

  /**
   * Start Server
   * @returns
   */
  private server () {
    const app = express()
    app.use(express.json())
    app.use('/', router)
    return app
  }

  /**
   * Connect With databases
   */
  private async connectDBs () {
    await sequelize.connect()
  }
}

export { App }
