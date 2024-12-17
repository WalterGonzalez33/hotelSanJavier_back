import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

// config variables de entorno
dotenv.config()

const mongoDB = process.env.MONGO_URI

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(mongoDB, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000
    })
    const url = colors.bgGreen.white.bold(`${connection.host}: ${connection.port}`)
    console.info(colors.cyan.bold(`BD conectada correctamente: ${url}\n`))
  } catch (err) {
    if (err instanceof Error) {
      console.error(colors.bgRed.white.italic(`Error al conectar a la BD: ${err.message}`))
    } else {
      console.error(colors.bgRed.white.italic('Error desconocido:'), err)
    }
    process.exit(1)
  }
}

connectDB()
