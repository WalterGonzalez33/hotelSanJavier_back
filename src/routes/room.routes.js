import { Router } from 'express'
import { createRoom, editRoom, deleteRoom, ListarRoom, ListarRoomId } from '../controllers/room.controllers.js'
const roomRouter = Router()

roomRouter.route('/rooms').post(createRoom).get(ListarRoom)
roomRouter.route('/rooms/:id').get(ListarRoomId).put(editRoom).delete(deleteRoom)

export default roomRouter
