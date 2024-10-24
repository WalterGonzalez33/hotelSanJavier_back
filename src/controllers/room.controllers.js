import Room from "../database/model/modelRoom.js";

export const funcionPrueba = (req, res) => {
  console.log("alguien hizo una solicitud");
  res.send("hola mundo desde el backend");
};

export const createRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(201).json({ mensaje: "La habitacion fue creada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "La habitacion no pudo ser creada" });
  }
};

// get que devuelve todo los productos

export const ListarRoom = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch {
    res.status(500).json({ mensaje: "No se encontro ninguna habitacion" });
  }
};

// get que devuelve un solo producto

export const ListarRoomId = async (req, res) => {
  try {
    const roomsId = await Room.findById(req.params.id);
    if (!roomsId) {
      return res
        .status(404)
        .json({ mensaje: "La habitacion buscada no fue encontrada" });
    }
    res.status(200).json(roomsId);
  } catch {}
};
