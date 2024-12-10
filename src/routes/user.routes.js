import { Router } from 'express'
import { createUser, getUser, getUserRoll, login, userDelete, userEdit, userList } from '../controllers/userController.js'
import validacionUsuario from '../validations/validationUsers.js'
import validateJWT from '../helpers/verifyJWT.js'
import verifyAdmin from '../helpers/verifyAdmin.js'

const router = Router()

router.route('/get-roll-user/:id')
  .get(getUserRoll)

router.route('/users')
  .post([validacionUsuario], createUser)
  .get([validateJWT, verifyAdmin], userList)

router.route('/users/:id')
  .get([validateJWT, verifyAdmin], getUser)
  .put([validateJWT, verifyAdmin], userEdit)
  .delete([validateJWT, verifyAdmin], userDelete)

router.route('/login').post(login)

export default router
