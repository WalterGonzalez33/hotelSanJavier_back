import {Router} from "express";
import { createRoom, funcionPrueba, ListarProductos } from "../controllers/room.controllers.js";

const roomRouter = Router();

roomRouter.route('/prueba').get(funcionPrueba)
roomRouter.route('/rooms').post(createRoom).get(ListarProductos)


export default roomRouter

