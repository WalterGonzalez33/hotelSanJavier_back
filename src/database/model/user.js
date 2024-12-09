import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    require: true,
    unique: true,
    validate: {
      validator: (value) => {
        return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
          value
        )
      }
    }
  },
  username: {
    type: String,
    required: true,
    default: 'userName',
    min: 3,
    max: 25,
    trim: true
  },
  password: {
    type: String,
    trim: true,
    require: true,
    minLength: 8,
    validate: {
      validator: (value) => {
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)
      }
    }
  },
  status: {
    type: String,
    required: true,
    enum: [
      'Activo',
      'Suspendido'
    ],
    default: 'Activo',
    trim: true
  },
  roll: {
    type: String,
    required: true,
    enum: [
      'Usuario',
      'Admin'
    ],
    default: 'Usuario',
    trim: true
  },
  isDeleted: { type: Boolean, default: false }
})
const User = mongoose.model('User', userSchema)
const createUserAdmin = async () => {
  const checkAdmin = await User.findOne({ email: 'admin@hotel.com' })

  if (checkAdmin) { return }

  const adminData = {
    username: 'admin',
    email: 'admin@hotel.com',
    password: 'Admin@1234',
    roll: 'Admin'
  }

  const userAdmin = new User(adminData)
  userAdmin.save()
}

createUserAdmin()
export default User
