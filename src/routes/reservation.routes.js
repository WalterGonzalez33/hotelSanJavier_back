import { Router } from 'express'
import { availabilityRooms, createReservation, deleteReservation, editReservation, getReservation, listReservation } from '../controllers/reservation.controllers.js'
import { reservationValidations } from '../validations/validationReservation.js'

const router = Router()

router.route('/create').post([reservationValidations, availabilityRooms], createReservation)
router.route('/list').get(listReservation)
router.route('/:id').get(getReservation).put([reservationValidations, availabilityRooms], editReservation).delete(deleteReservation)

export default router
