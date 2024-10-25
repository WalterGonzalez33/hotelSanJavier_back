import Room from '../database/model/modelRoom.js'

export const funcionPrueba = (req, res) => {
  console.log('alguien hizo una solicitud')
  res.send('hola mundo desde el backend')
}

export const createRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body)
    await newRoom.save()
    res.status(201).json({ mensaje: 'La habitacion fue creada correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'La habitacion no pudo ser creada' })
  }
}
