import Reservation from '../database/model/reservation.model.js'

// func create reservation
export const createReservation = async (req, res) => {
  try {
    const newReservation = new Reservation(req.body)
    await newReservation.save()
    res.status(201).json({ message: '[OK] La reservación fue creada correctamente' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: '[ERROR] La reservación no pudo ser creada' })
  }
}

// func list reservation
export const listReservation = async (req, res) => {
  try {
    const listReservation = await Reservation.find()
    res.status(200).json(listReservation)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: '[ERROR] No se pudo listar las reservaciones' })
  }
}

// func edit reservation
export const getReservation = async (req, res) => {
  try {
    const { id } = req.params
    const reservationFindId = await Reservation.findById(id)
    if (!reservationFindId) {
      return res.status(404).json({ message: '[ERROR] No se pudo encontrar la reservación' })
    }
    res.status(200).json(reservationFindId)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: '[ERROR] No se pudo obtener la reservación' })
  }
}

// func edit reservation
export const editReservation = async (req, res) => {
  try {
    const { id } = req.params
    const reservationFindId = await Reservation.findById(id)
    if (!reservationFindId) {
      return res.status(404).json({ message: '[ERROR] No se pudo encontrar la reservación' })
    }
    await Reservation.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: '[OK] La reservación fue editada correctamente' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: '[ERROR] No se pudo editar la reservación' })
  }
}

// func delete reservation
export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params
    const reservationFindId = await Reservation.findById(id)
    if (!reservationFindId) {
      return res.status(404).json({ message: '[ERROR] No se pudo encontrar la reservación' })
    }
    await Reservation.findByIdAndDelete(id)
    res.status(200).json({ message: '[OK] La reservación fue eliminada correctamente' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: '[ERROR] No se pudo eliminar la reservación' })
  }
}
