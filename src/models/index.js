import mongoose from 'mongoose'
import config from '../../config'

class DBInit {
  init() {
    return new Promise((resolve, reject) => {
      mongoose.connect(config.URLDB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useNewUrlParser: true })
      const db = mongoose.connection
      db.on('error', (err) => {
        reject(error)
      })
      db.once('open', () => {
        resolve('DB connection...')
      })
    })
  }
}

export default new DBInit;