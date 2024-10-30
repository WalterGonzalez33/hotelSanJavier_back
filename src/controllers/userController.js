import User from "../database/model/user.js";
import bcrypt from "bcrypt";


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
    const { email, password } = req.body;
    const usuarioExistente = await User.findOne({ email });
    if (!usuarioExistente) {
      return res
        .status(400)
        .json({ mensaje: "Correo o password incorrecto - email" });
    }
    //quiero saber si el password en incorrecto
    if (!passwordValido) {
      return res
        .status(400)
        .json({ mensaje: "Correo o password incorrecto - password" });
    }
    // generar un token
    // respodemos afirmativamente
    res.status(200).json({
      mensaje: "Los datos del usuario son validos",
      email
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