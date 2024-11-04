import { Router } from "express";
import { createUser, login, userDelete, userList, userEdit } from "../controllers/userController.js";
import verifyJWT from "../helpers/verifyJWT.js"
const router = Router()
router.route('/users').post(createUser).get(userList);
router.route('/users/:id').delete(userDelete);
//faltaba la ruta del login
router.route('/users/login').post([verifyJWT],login)

export default router;