import {Router} from "express";
import { createRoom, funcionPrueba, ListarProdocutos } from "../controllers/room.controllers.js";

const roomRouter = Router();

roomRouter.route('/prueba').get(funcionPrueba)
roomRouter.route('/rooms').post(createRoom).get(ListarProdocutos)


export default roomRouter

