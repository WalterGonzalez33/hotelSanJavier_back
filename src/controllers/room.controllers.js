import mongoose from 'mongoose'
import Room from '../database/model/modelRoom.js'

export const createRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body)
    await newRoom.save()
    res.status(201).json({ mensaje: 'La habitación fue creada correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'La habitación no pudo ser creada' })
  }
}

// Get que devuelve toda las habitaciones

export const ListarRoom = async (req, res) => {
  try {
    const rooms = await Room.aggregate(
      [
        {
          $lookup:
          {
            from: 'reservations',
            localField: '_id',
            foreignField: 'room_id',
            as: 'reservations'
          }
        }
      ]
    )
    res.status(201).json(rooms)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'No se pudo encontrar habitaciones' })
  }
}

// Get que devuelve una sola habitación

export const ListarRoomId = async (req, res) => {
  try {
    const { id } = req.params
    if (typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensaje: '[ERROR] El id no es valido' })
    }
    const roomId = await Room.aggregate(
      [
        {
          $lookup:
          {
            from: 'reservations',
            localField: '_id',
            foreignField: 'room_id',
            as: 'reservations'
          }
        },
        {
          $match: { _id: new mongoose.Types.ObjectId(id) }
        }
      ]
    )
    if (roomId.length === 0) {
      return res
        .status(404)
        .json({ mensaje: 'La habitación buscada no fue encontrada' })
    }
    res.status(200).json(roomId)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'error en la búsqueda' })
  }
}

export const editRoom = async (req, res) => {
  try {
    const searchRoom = await Room.findById(req.params.id)
    if (!searchRoom) {
      return res.status(404).json({ mensaje: 'La habitación solicitada no existe' })
    };
    await Room.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({ mensaje: 'La habitación fue modificada con éxito' })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ mensaje: 'Ocurrió un error, no pudimos hacer las modificaciones solicitadas' })
  }
}

export const deleteRoom = async (req, res) => {
  try {
    const searchRoom = await Room.findById(req.params.id)
    if (!searchRoom) {
      return res.status(404).json({ mensaje: 'La habitación solicitada no existe' })
    };
    await Room.findByIdAndDelete(req.params.id, req.body)
    res.status(200).json({ mensaje: 'La habitación fue eliminada con éxito' })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ mensaje: 'Ocurrió un error, no pudimos hacer eliminar la habitación seleccionada' })
  }
}
