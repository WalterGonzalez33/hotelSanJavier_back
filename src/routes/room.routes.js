import { Router } from 'express'
import { createRoom, funcionPrueba } from '../controllers/room.controllers.js'

const roomRouter = Router()

roomRouter.route('/prueba').get(funcionPrueba)
roomRouter.route('/rooms').post(createRoom)

export default roomRouter
