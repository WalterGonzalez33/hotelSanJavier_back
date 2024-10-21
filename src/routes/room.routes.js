import {Router} from "express";
import { funcionPrueba } from "../controllers/room.controllers.js";

const roomRouter = Router();

roomRouter.route('/prueba').get(funcionPrueba)


export default roomRouter

