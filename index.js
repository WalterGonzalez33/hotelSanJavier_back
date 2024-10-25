import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import './src/database/dbConnection.js'
import userRouter from './src/routes/user.routes.js'


// config de las variables de entorno
dotenv.config()

// config del puerto
const app = express()
app.set('port', process.env.PORT || 4000)
const port = app.get('port')

// config de middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ruta principal con el archivo estático

const __fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileName)
app.use(express.static(path.join(__dirName, '/public')))

// lanzamiento del servidor
app.listen(port, () => {
  console.info(`Servidor escuchando en el puerto ${port}`)
})

// configuramos las rutas
app.use('/user',userRouter)

