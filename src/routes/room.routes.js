import { Router } from 'express'
import { createRoom, editRoom, deleteRoom, ListarRoom, ListarRoomId, checkAvailable } from '../controllers/room.controllers.js'
import roomsValidations from '../validations/validationRooms.js'
import validateJWT from '../helpers/verifyJWT.js'
import verifyAdmin from '../helpers/verifyAdmin.js'

const roomRouter = Router()

roomRouter.route('/rooms')
  .post([validateJWT, verifyAdmin, roomsValidations], createRoom)
  .get([validateJWT, verifyAdmin], ListarRoom)

roomRouter.route('/rooms/:id')
  .get([validateJWT, verifyAdmin], ListarRoomId)
  .put([validateJWT, verifyAdmin, roomsValidations], editRoom)
  .delete([validateJWT, verifyAdmin], deleteRoom)

roomRouter.route('/rooms/:check_in/:check_out').get(checkAvailable)

export default roomRouter
