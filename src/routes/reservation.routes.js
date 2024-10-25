import { Router } from 'express'
import { createReservation } from '../controllers/reservation.controllers.js'

const router = Router()

router.route('/create').post(createReservation)

export default router
