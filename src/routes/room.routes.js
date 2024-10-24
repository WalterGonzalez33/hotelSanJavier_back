import { Router } from 'express'
import { createRoom, funcionPrueba,editRoom, viewRooms, deleteRoom } from '../controllers/room.controllers.js'
const roomRouter = Router()

roomRouter.route('/prueba').get(funcionPrueba)
roomRouter.route('/rooms').post(createRoom).get(viewRooms)
roomRouter.route('/rooms/:id').put(editRoom).delete(deleteRoom)

export default roomRouter
