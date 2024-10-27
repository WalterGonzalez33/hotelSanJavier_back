import { check } from 'express-validator'
import { handleValidationResult } from '../helpers/validationResult.js'

export const reservationValidations = [
  check('check_in')
    .notEmpty()
    .withMessage('La fecha de ingreso es obligatoria')
    .isLength({ min: 8, max: 10 })
    .withMessage('La fecha de ingreso tiene que tener de 8 a 10 caracteres ')
    .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/)
    .withMessage('La fecha de ingreso no tiene el formato valido (YYYY-MM-DD)'),
  check('check_out')
    .notEmpty()
    .withMessage('La fecha de salida es obligatoria')
    .isLength({ min: 8, max: 10 })
    .withMessage('La fecha de salida tiene que tener de 8 a 10 caracteres ')
    .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/)
    .withMessage('La fecha de salida no tiene el formato valido (YYYY-MM-DD)'),
  check('persons')
    .notEmpty()
    .withMessage('El dato personas es obligatorio')
    .isLength({ min: 1, max: 2 })
    .withMessage('No puede haber mas de 4 personas en una reservación'),
  check('user_id')
    .notEmpty()
    .withMessage('El id de usuario es obligatorio')
    .matches(/^[a-fA-F0-9]{24}$/)
    .withMessage('El id no tiene el formato valido'),
  check('room_id')
    .notEmpty()
    .withMessage('El id de la habitación es obligatorio')
    .matches(/^[a-fA-F0-9]{24}$/)
    .withMessage('El id no tiene el formato valido'),
  (req, res, next) => handleValidationResult(req, res, next)
]
