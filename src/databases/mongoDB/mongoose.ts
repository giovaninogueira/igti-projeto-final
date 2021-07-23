import { Mongoose } from 'mongoose'
import { IDatabase } from '../database.interface'

export class MongooseDB extends Mongoose implements IDatabase {
  async connectDB () {
    await this.connect('mongodb://localhost:49154/livroInfo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  }
}

export const mongoose = new MongooseDB()
