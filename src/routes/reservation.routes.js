import { Router } from 'express'
import { createReservation, deleteReservation, editReservation, listReservation } from '../controllers/reservation.controllers.js'

const router = Router()

router.route('/create').post(createReservation)
router.route('/list').get(listReservation)
router.route('/:id').put(editReservation).delete(deleteReservation)

export default router
