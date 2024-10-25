import { Router } from 'express'
import { createRoom, funcionPrueba,editRoom, deleteRoom} from '../controllers/room.controllers.js'
const roomRouter = Router()

roomRouter.route('/prueba').get(funcionPrueba)
roomRouter.route('/rooms').post(createRoom).get(ListarRoom)
roomRouter.route('/rooms/:id').get(ListarRoomId).put(editRoom).delete(deleteRoom)


export default roomRouter
