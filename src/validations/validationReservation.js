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
    .isNumeric()
    .withMessage('El dato persons tiene que ser un numero')
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

export const validationCheckOutBefore = (checkIn, checkOut) => {
  const normalizeDate = (date) => {
    date.setHours(0, 0, 0, 0)
    return date
  }
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

  if (!dateRegex.test(checkIn) || !dateRegex.test(checkOut)) {
    return { success: false, msg: '[ERROR] Formato de fechas incorrecto' }
  }

  const checkInDate = normalizeDate(new Date(checkIn))
  const checkOutDate = normalizeDate(new Date(checkOut))
  const currentDay = normalizeDate(new Date())

  if (checkInDate < currentDay) {
    return { success: false, msg: '[ERROR] Solo se puede reservar desde el dia actual en adelante' }
  }
  if (checkOutDate < checkInDate) {
    return { success: false, msg: '[ERROR] La fecha de salida no puede ser antes de la entrada' }
  }

  return { success: true, msg: '[OK] Fechas verificadas correctamente' }
}

export const validateAvailabilityRoom = (checkIn, checkOut, reservations, numberRooms) => {
  if (reservations.length === 0) {
    return { success: true, msg: '[OK] Hay disponibilidad' }
  }

  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  let countNumberRooms = numberRooms

  for (let i = reservations.length - 1; i >= 0; i--) {
    // eslint-disable-next-line camelcase
    const { check_in, check_out } = reservations[i]

    const currentCheckInDate = new Date(check_in)
    const currentCheckOutDate = new Date(check_out)

    if ((checkInDate >= currentCheckInDate && checkOutDate <= currentCheckOutDate) ||
    (checkInDate < currentCheckOutDate && checkInDate >= currentCheckInDate) ||
    (checkOutDate > currentCheckInDate && checkOutDate <= currentCheckOutDate)
    ) {
      countNumberRooms--
    }
  }

  if (countNumberRooms > 0) { return { success: true, msg: '[OK] Hay disponibilidad' } }

  return { success: false, msg: '[ERROR] No hay disponibilidad' }
}
