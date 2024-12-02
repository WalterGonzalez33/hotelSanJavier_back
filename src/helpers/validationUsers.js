import { check } from 'express-validator'
import handleValidationResult from './validationResult.js'

const validacionUsuario = [
  check('email')
    .notEmpty()
    .withMessage('El email del usuario es un dato obligatorio'),

  check('username')
    .notEmpty()
    .isLength({
      min: 2,
      max: 25
    })
    .withMessage('El nombre del usuario es obligatorio'),

  check('password')
    .notEmpty()
    .isLength({
      min: 6
    })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .withMessage('la contraseña es obligatorio'),
  (req, res, next) => handleValidationResult(req, res, next)
]

export default validacionUsuario
