import jwt from 'jsonwebtoken'

const validateJWT = (req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token) {
      return res.status(401).json({ mensaje: 'no hay token en la petición' })
    }

    const payload = jwt.verify(token, process.env.SECRET_JWT)

    req.email = payload.email

    next()
  } catch (error) {
    console.error('error al verificar el token:', error.message)
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        mensaje: 'Token Invalido'
      })
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        mensaje: 'Token Expirado'
      })
    } else {
      return res.status(401).json({
        mensaje: 'Error en la autenticación'
      })
    }
  }
}

export default validateJWT
