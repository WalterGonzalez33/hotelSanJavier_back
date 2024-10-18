import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import './src/database/dbConnection.js'

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

// rutas

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.listen(port, () => {
  console.info(`Servidor escuchando en el puerto ${port}`)
})
