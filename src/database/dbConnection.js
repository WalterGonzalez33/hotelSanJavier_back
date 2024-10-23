import mongoose from 'mongoose'
import dotenv from 'dotenv'

// config variables de entorno
dotenv.config()

const mongoDB = process.env.MONGO_URI

mongoose.connect(mongoDB)

const infoConnection = mongoose.connection

infoConnection.once('open', () => {
  console.info('DB conectada correctamente ')
})
