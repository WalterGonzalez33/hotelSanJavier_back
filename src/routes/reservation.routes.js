import { Router } from 'express'
import { createReservation, listReservation } from '../controllers/reservation.controllers.js'

const router = Router()

router.route('/create').post(createReservation)
router.route('/list').get(listReservation)

export default router
