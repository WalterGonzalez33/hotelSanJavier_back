import { Router } from 'express'
import { createUser, getUser, login, userDelete, userEdit, userList } from '../controllers/userController.js'
const router = Router()
router.route('/users').post(createUser).get(userList)
router.route('/users/:id').get(getUser).put(userEdit).delete(userDelete)
router.route('/login').post(login)

export default router
