import User from "../database/model/user.js";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generateJWT.js";



export const createUser = async (req, res) => {
  try {
    // agregar validaciones
    // Verifico si el mail ya fue registrado
    const { email, username, password , status, roll } = req.body;
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
        return res
          .status(400)
          .json({ mensaje: "Este correo ya se encuentra registrado" });
      }

    // crear el usuario
    const newUser = new User(req.body);
    // Hashear el password
    const saltos = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(password, saltos);
    newUser.save();
    // Enviar una respuesta afirmativa
    res.status(201).json({ mensaje: "El usuario se creo correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ mensaje: "Ocurrio un error al intentar crear un usuario" });
  }
};

export const login = async (req, res) => {
  try {
    //agregar validaciones
    //verificar si el mail ya fue registrado
    const { email} = req.body;
    const usuarioExistente = await User.findOne({ email });
    if (!usuarioExistente) {
      return res
        .status(400)
        .json({ mensaje: "Correo o password incorrecto - email" });
    }
    
   
    // generar un token
    const token = await generarJWT(usuarioExistente._id, usuarioExistente.email)
    // respodemos afirmativamente
    res.status(200).json({
      mensaje: "Los datos del usuario son validos",
      token,
      id:usuarioExistente._id
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar loguear a un usuario" });
  }
};

export const userList = async (req,res) =>{
    try{
      const users = await User.find();
      res.status (200).json(users);

    } catch (error) {
      console.error(error);
      res.status(500).json({mensaje: "ocurrio un error no se pudo crear el usuario"})
    }
};

export const userDelete = async(req, res) =>{
  try {
    const searchUser = await User.findById(req.params.id)
    if (!searchUser) {
      return res.status(404).json({ mensaje: 'El usuario selicitado no existe' })
    };
    await User.findByIdAndDelete(req.params.id, req.body)
    res.status(200).json({ mensaje: 'El usuario fue eliminado con éxito' })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ mensaje: 'Ocurrió un error, no pudimos eliminar el usuario seleccionado' })
  }
}

