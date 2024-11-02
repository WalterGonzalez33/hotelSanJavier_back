import { Router } from "express";
import { createUser, login, userDelete, userList } from "../controllers/userController.js";
const router = Router()
router.route('/users').post(createUser).get(userList);
router.route('/users/:id').delete(userDelete);
router.route('/login').post(login)

export default router;