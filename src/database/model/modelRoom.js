import mongoose, { Schema } from 'mongoose'

const roomSchema = new Schema({
  room_name: {
    type: String,
    required: true,
    enum: [
      'Dobles Superiores',
      'Departamentos',
      'Doble de Lujo',
      'Suites Superiores',
      'Suite Junior',
      'Habitaciones Dobles Deluxe'
    ],
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 5000,
    max: 1000000
  },
  benefits: {
    type: Array,
    required: true
  },
  number_rooms: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => {
        return /^(1[0-9]|20|[1-9])$/.test(value)
      }
    }
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/.test(value)
      }
    },
    trim: true
  },
  brief_description: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100
  },
  broad_description: {
    type: String,
    required: true,
    minLength: 50,
    maxLength: 1000
  },
  isDeleted: { type: Boolean, default: false }
})

const Room = mongoose.model('room', roomSchema)

export default Room
