import { Router } from 'express'
import { createRoom, editRoom, deleteRoom, ListarRoom, ListarRoomId, checkAvailable } from '../controllers/room.controllers.js'
import roomsValidations from '../validations/validationRooms.js'
const roomRouter = Router()

roomRouter.route('/rooms').post([roomsValidations],createRoom).get(ListarRoom)
roomRouter.route('/rooms/:id').get(ListarRoomId).put([roomsValidations],editRoom).delete(deleteRoom)
roomRouter.route('/rooms/:check_in/:check_out').get(checkAvailable)

export default roomRouter
