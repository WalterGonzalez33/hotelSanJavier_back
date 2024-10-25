import Room from '../database/model/modelRoom.js'

export const funcionPrueba = (req, res) => {
  console.log('alguien hizo una solicitud')
  res.send('hola mundo desde el backend')
}


export const createRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(201).json({ mensaje: "La habitacion fue creada correctamente" });
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'La habitacion no pudo ser creada' })
  }
};

// Get que devuelve toda las habitaciones

export const ListarRoom = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(201).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(404).json({ mensaje: "No se encontro ninguna habitacion" });
  }
};

// Get que devuelve una sola habitacion

export const ListarRoomId = async (req, res) => {
  try {
    const roomsId = await Room.findById(req.params.id);
    if (!roomsId) {
      return res
        .status(404)
        .json({ mensaje: "La habitacion buscada no fue encontrada" });
    }
    res.status(200).json(roomsId);
  } catch (error)
  {
    console.error(error)
    res.status(500).json({mensaje: "error en la busqueda"})
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
