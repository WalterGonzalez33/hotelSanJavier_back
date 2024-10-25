import { Router } from "express";
import {listaUser} from "../controllers/userController.js";
const router = Router()
router.route('/users').get(listaUser);

export default router;