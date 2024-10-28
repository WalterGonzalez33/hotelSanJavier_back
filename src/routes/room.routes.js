import { Router } from 'express'
import { createRoom, editRoom, deleteRoom, ListarRoom, ListarRoomId } from '../controllers/room.controllers.js'
import roomsValidations from '../validations/validationRooms.js'
const roomRouter = Router()

roomRouter.route('/rooms').post([roomsValidations],createRoom).get(ListarRoom)
roomRouter.route('/rooms/:id').get(ListarRoomId).put([roomsValidations],editRoom).delete(deleteRoom)

export default roomRouter
