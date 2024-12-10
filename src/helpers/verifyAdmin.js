import User from '../database/model/user.js'

const verifyAdmin = async (req, res, next) => {
  try {
    const { email } = req

    const currentUser = await User.findOne({ email })

    if (!currentUser) {
      return res.status(401).json({ message: '[ERROR] No se pudo encontrar el usuario' })
    }

    if (currentUser.roll === 'Usuario') {
      return res.status(401).json({ message: '[ERROR] No tienes permisos para esta operación' })
    }

    next()
  } catch (err) {
    res.status(401).json({ message: '[ERROR] Error inesperado en el token' })
  }
}

export default verifyAdmin
