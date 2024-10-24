import {Router} from "express";
import { createRoom, funcionPrueba, ListarRoom, ListarRoomId } from "../controllers/room.controllers.js";

const roomRouter = Router();

roomRouter.route('/prueba').get(funcionPrueba)
roomRouter.route('/rooms').post(createRoom).get(ListarRoom)
roomRouter.route('/rooms/:id').get(ListarRoomId)


export default roomRouter

