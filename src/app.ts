import { sequelize } from './databases/mysql/sequelize'
import express from 'express'
import 'express-async-errors'
import router from './routes/route.router'
import { errorMiddleware } from './middlewares/error.middleware'

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
   * Connect With databases
   */
  private async connectDBs () {
    await sequelize.connect()
  }

  /**
   * Start Server
   * @returns
   */
  private server () {
    const app = express()
    app.use(express.json())
    app.use('/', router)
    app.use(errorMiddleware)
    return app
  }
}

export { App }
