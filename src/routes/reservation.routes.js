import { Router } from 'express'
import { createReservation, deleteReservation, editReservation, getReservation, listReservation } from '../controllers/reservation.controllers.js'
import { reservationValidations } from '../validations/validationReservation.js'

const router = Router()

router.route('/create').post([reservationValidations], createReservation)
router.route('/list').get(listReservation)
router.route('/:id').get(getReservation).put([reservationValidations], editReservation).delete(deleteReservation)

export default router
