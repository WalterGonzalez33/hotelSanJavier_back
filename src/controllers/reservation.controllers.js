import Reservation from '../database/model/reservation.model.js'

// func create reservation
export const createReservation = async (req, res) => {
  try {
    const newReservation = new Reservation(req.body)
    await newReservation.save()
    res.status(201).json({ mensaje: 'La reservación fue creada correctamente' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ mensaje: 'La reservación no pudo ser creada' })
  }
}

// func list reservation
export const listReservation = async (req, res) => {
  try {
    const listReservation = await Reservation.find()
    res.status(200).json(listReservation)
  } catch (err) {
    console.error(err)
    res.status(500).json({ mensaje: 'No se pudo listar las reservaciones' })
  }
}
