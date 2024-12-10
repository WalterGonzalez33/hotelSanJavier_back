import mongoose, { Schema } from 'mongoose'

const reservationSchema = new Schema(
  {
    check_in: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 10,
      validate: {
        validator: (value) => {
          return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value)
        }
      },
      trim: true
    },
    check_out: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 10,
      validate: {
        validator: (value) => {
          return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value)
        }
      },
      trim: true
    },
    persons: {
      type: Number,
      required: true,
      minLength: 1,
      maxLength: 2,
      default: 1
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    room_id: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

const Reservation = mongoose.model('reservation', reservationSchema)

export default Reservation
