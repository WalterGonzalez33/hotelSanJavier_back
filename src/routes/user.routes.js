import { Router } from 'express'
import { createUser, userDelete, userList } from '../controllers/userController.js'
const router = Router()
router.route('/users').post(createUser).get(userList)
router.route('/users/:id').delete(userDelete)

export default router
