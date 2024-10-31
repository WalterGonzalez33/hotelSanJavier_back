import { Router } from 'express'
import { createRoom, editRoom, deleteRoom, ListarRoom, ListarRoomId, checkAvailable } from '../controllers/room.controllers.js'
const roomRouter = Router()

roomRouter.route('/rooms').post(createRoom).get(ListarRoom)
roomRouter.route('/rooms/:id').get(ListarRoomId).put(editRoom).delete(deleteRoom)
roomRouter.route('/rooms/:check_in/:check_out').get(checkAvailable)

export default roomRouter
