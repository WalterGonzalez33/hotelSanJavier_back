import { Router } from "express";
import { createUser, userList } from "../controllers/userController.js";
const router = Router()
router.route('/users').post(createUser).get(userList);

export default router;