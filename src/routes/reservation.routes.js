import { Router } from 'express'
import { availabilityRooms, createReservation, deleteReservation, editReservation, getReservation, listReservation } from '../controllers/reservation.controllers.js'
import { reservationValidations } from '../validations/validationReservation.js'
import verifyAdmin from '../helpers/verifyAdmin.js'
import validateJWT from '../helpers/verifyJWT.js'

const router = Router()

router.route('/create')
  .post([validateJWT, reservationValidations, availabilityRooms], createReservation)

router.route('/list').get([validateJWT, verifyAdmin], listReservation)

router.route('/:id')
  .get([validateJWT, verifyAdmin], getReservation)
  .put([validateJWT, verifyAdmin, reservationValidations, availabilityRooms], editReservation)
  .delete([validateJWT, verifyAdmin], deleteReservation)

export default router
