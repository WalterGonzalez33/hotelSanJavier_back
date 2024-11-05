import User from '../database/model/user.js'
import bcrypt from 'bcrypt'
import generarJWT from '../helpers/generateJWT.js'

export const createUser = async (req, res) => {
  try {
    const { email, username, password, status, roll } = req.body
    let data = {}
    if (!status && !roll) {
      data = {
        roll: 'Usuario',
        status: 'Activo',
        email,
        username,
        password
      }
    } else {
      data = {
        roll,
        status,
        email,
        username,
        password
      }
    }
    const usuarioExistente = await User.findOne({ email })
    const usernameExist = await User.findOne({ username })
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ mensaje: 'Este correo ya se encuentra registrado' })
    }
    if (usernameExist) {
      return res
        .status(400)
        .json({ message: 'El nombre de usuario ya se encuentra registrado' })
    }

    const newUser = new User(data)
    const saltos = bcrypt.genSaltSync(10)
    newUser.password = bcrypt.hashSync(password, saltos)
    newUser.save()
    // Enviar una respuesta afirmativa
    res.status(201).json({ mensaje: 'El usuario se creo correctamente' })
  } catch (error) {
    console.error(error)
    res
      .status(400)
      .json({ mensaje: 'Ocurrió un error al intentar crear un usuario' })
  }
}

export const login = async (req, res) => {
  try {
    // agregar validaciones
    // verificar si el mail ya fue registrado
    // falta checkear contraseña
    const { email, password } = req.body
    const usuarioExistente = await User.findOne({ email })
    if (!usuarioExistente) {
      return res
        .status(400)
        .json({ mensaje: 'Correo o password incorrecto - email' })
    }
    // verifico contraseña
    const passwordValido = bcrypt.compare(password, usuarioExistente.password)
    // quiero saber si el password es incorrecto
    if (!passwordValido) {
      return res
        .status(400)
        .json({ mensaje: 'Correo o password incorrecto - password' })
    }
    // generar un token
    const token = await generarJWT(
      usuarioExistente._id
    )
    // respodemos afirmativamente
    res.status(200).json({
      mensaje: 'Los datos del usuario son validos',
      token
    })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ mensaje: 'Ocurrio un error al intentar loguear a un usuario' })
  }
}

export const userList = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'ocurrio un error no se pudo crear el usuario' })
  }
}

export const userDelete = async (req, res) => {
  try {
    const searchUser = await User.findById(req.params.id)
    if (!searchUser) {
      return res.status(404).json({ mensaje: 'El usuario solicitado no existe' })
    };
    await User.findByIdAndDelete(req.params.id, req.body)
    res.status(200).json({ mensaje: 'El usuario fue eliminado con éxito' })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      mensaje: 'Ocurrió un error, no pudimos eliminar el usuario seleccionado'
    })
  }
}

export const userEdit = async (req, res) => {
  try {
    const { id: _id } = req.params

    const { email, username } = await User.findOne({ _id })
    const emailExist = await User.findOne({ email })
    const usernameExist = await User.findOne({ username })
    if (emailExist && emailExist.email !== email) {
      return res
        .status(400)
        .json({ mensaje: 'Este correo ya se encuentra registrado' })
    }
    if (usernameExist && usernameExist.username !== username) {
      return res
        .status(400)
        .json({ message: 'El nombre de usuario ya se encuentra registrado' })
    }

    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true
    })

    if (!updatedUser) {
      return res.status(404).json({ mensaje: 'El usuario solicitado no existe' })
    }

    res.status(200).json({
      mensaje: 'El usuario fue actualizado con éxito',
      usuario: updatedUser
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Ocurrió un error, no se pudo actualizar el usuario' })
  }
}

export const getUser = async (req, res) => {
  try {
    const { id: _id } = req.params
    const getUserId = await User.findOne({ _id })

    if (!getUserId) {
      return res.status(404).json({ mensaje: 'El usuario solicitado no existe' })
    }

    res.status(200).json(getUserId)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Ocurrió un error, no se pudo obtener el usuario' })
  }
}
