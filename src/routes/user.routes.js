import { Router } from "express";
import { createUser, userDelete, userList, userEdit } from "../controllers/userController.js";
const router = Router()
router.route('/users').post(createUser).get(userList);
router.route('/users/:id').delete(userDelete);
router.route('/users/:id').delete(userDelete).put(userEdit);

export default router;