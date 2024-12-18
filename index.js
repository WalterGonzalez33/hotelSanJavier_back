import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import './src/database/dbConnection.js'
import colors from 'colors'
import { fileURLToPath } from 'url'
import roomRouter from './src/routes/room.routes.js'
import userRouter from './src/routes/user.routes.js'
import reservationRouter from './src/routes/reservation.routes.js'
import validateJWT from './src/helpers/verifyJWT.js'

// config de las variables de entorno
dotenv.config()

// config del puerto
const app = express()
app.set('port', process.env.PORT || 4000)
const port = app.get('port')

// config de middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.options('*', cors())

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "script-src 'self' https://vercel.live")
  next()
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  next()
})
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ruta principal con el archivo estático

const __fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileName)
app.use(express.static(path.resolve(__dirName, 'public')))

// lanzamiento del servidor
app.listen(port, () => {
  console.info(colors.cyan.italic(`\nServidor escuchando en el puerto: ${colors.green.bold(port)}`))
})

// configuración de ruta
app.post('/api/checkToken', [validateJWT], (req, res) => {
  res.status(200).json({ access: true })
})
app.use('/api', roomRouter)
app.use('/api', userRouter)
app.use('/api/reservation', reservationRouter)
