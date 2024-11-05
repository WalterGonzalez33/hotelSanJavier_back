import { Router } from "express";
import { createUser, userDelete, userList } from "../controllers/userController.js";
import validacionUsuario from "../helpers/validationUsers.js";
const router = Router()
router.route('/users').post([validacionUsuario],createUser).get(userList);
router.route('/users/:id').delete(userDelete);
router.route('/login').post(login)

export default router
