import mongoose from 'mongoose'
import Reservation from '../database/model/reservation.model.js'
import Room from '../database/model/modelRoom.js'
import { validateAvailabilityRoom, validationCheckOutBefore } from '../validations/validationReservation.js'
import User from '../database/model/user.js'

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
    const listReservation = await Reservation.aggregate(
      [
        {
          $lookup:
          {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user_reservation'
          }
        },
        {
          $unwind: '$user_reservation'
        },
        {
          $lookup:
          {
            from: 'rooms',
            localField: 'room_id',
            foreignField: '_id',
            as: 'room_reservation'
          }
        },
        {
          $unwind: '$room_reservation'
        },
        {
          $match: { isDeleted: false }
        }
      ]
    )
    res.status(200).json(listReservation)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: '[ERROR] No se pudo listar las reservaciones' })
  }
}

// func get id reservation
export const getReservation = async (req, res) => {
  try {
    const { id } = req.params
    if (typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: '[ERROR] El id no es valido' })
    }
    const reservationFindId = await Reservation.aggregate(
      [
        {
          $lookup:
          {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user_reservation'
          }
        },
        {
          $unwind: '$user_reservation'
        },
        {
          $lookup:
          {
            from: 'rooms',
            localField: 'room_id',
            foreignField: '_id',
            as: 'room_reservation'
          }
        },
        {
          $unwind: '$room_reservation'
        },
        {
          $match: { _id: new mongoose.Types.ObjectId(id) }
        }
      ]
    )
    if (reservationFindId.length === 0) {
      return res.status(404).json({ message: '[ERROR] No se pudo encontrar la reservación' })
    }
    res.status(200).json(reservationFindId[0])
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
    const reservationFindId = await Reservation.findByIdAndUpdate(id, { isDeleted: true })
    if (!reservationFindId) {
      return res.status(404).json({ message: '[ERROR] No se pudo encontrar la reservación' })
    }
    res.status(200).json({ message: '[OK] La reservación fue desactivada correctamente' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: '[ERROR] No se pudo desactivar la reservación' })
  }
}

// func room availability
export const availabilityRooms = async (req, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { check_in, check_out, room_id: idRoom, user_id: idUser } = req.body
    const getRoom = await Room.findById(idRoom)
    const getUser = await User.findById(idUser)

    if (!getRoom) {
      return res.status(400).json({ message: '[ERROR] La habitación no existe' })
    }
    if (!getUser) {
      return res.status(400).json({ message: '[ERROR] El usuario no existe' })
    }

    const getReservations = await Reservation.find({ room_id: idRoom })
    const checkValidateBeforeDate = validationCheckOutBefore(check_in, check_out)
    if (!checkValidateBeforeDate.success) {
      return res.status(400).json({ message: checkValidateBeforeDate.msg })
    }

    const checkValidateAvailabilityRoom = validateAvailabilityRoom(
      check_in,
      check_out,
      getReservations,
      getRoom.number_rooms)

    if (!checkValidateAvailabilityRoom.success) {
      return res.status(400).json({ message: checkValidateAvailabilityRoom.msg })
    }

    next()
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: '[ERROR] No se pudo procesar la reservación' })
  }
}
