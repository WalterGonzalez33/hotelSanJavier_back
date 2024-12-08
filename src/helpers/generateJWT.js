import jwt from 'jsonwebtoken'

const generarJWT = async (uid, email) => {
  try {
    const payload = { uid, email }
    const token = jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: '1m'
    })
    return token
  } catch (error) {
    console.error('Error al generar el token:', error.message)
    throw new Error('No se pudo generar el token')
  }
}
export default generarJWT
