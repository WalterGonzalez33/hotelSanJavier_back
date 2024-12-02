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
    max: 25
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
    default: 'Activo'
  },
  roll: {
    type: String,
    required: true,
    enum: [
      'Usuario',
      'Admin'
    ],
    default: 'Usuario'
  },
  isDeleted: { type: Boolean, default: false }
})
const User = mongoose.model('User', userSchema)
export default User
