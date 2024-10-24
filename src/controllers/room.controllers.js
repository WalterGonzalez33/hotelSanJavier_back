import Room from '../database/models/modelRoom.js'

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

export const viewRooms = async (req, res) =>{
  try {
    const habitaciones = await Room.find();
    res.status(200).json(habitaciones);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "ocurrio un error, no te pudimos mostrarte las habitaciones" });
  }

}

export const editRoom = async (req, res) =>{
  try{
    const searchRoom = await Room.findById(req.params.id)
    if (!searchRoom){
      return res.status(404).json({ mensaje: "La habitación solicitada no existe" });
       };
    await Room.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({ mensaje: "La habitación fue modificada con exito" });
  }catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error, no pudimos hacer las modificaciones solicitadas" });
  }
}

export const deleteRoom = async (req, res) =>{
  try{
    const searchRoom = await Room.findById(req.params.id)
    if (!searchRoom){
      return res.status(404).json({ mensaje: "La habitación solicitada no existe" });
       };
    await Room.findByIdAndDelete(req.params.id, req.body)
    res.status(200).json({ mensaje: "La habitación fue eliminada con exito" });
  }catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error, no pudimos hacer eliminar la habitacion seleccionada" });
  }
}
