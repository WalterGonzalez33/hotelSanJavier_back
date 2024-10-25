import mongoose, { Schema } from 'mongoose'

const reservationSchema = new Schema(
  {
    check_in: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 10
    },
    check_out: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 10
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
    }
  },
  {
    timestamps: true
  }
)

const Reservation = mongoose.model('reservation', reservationSchema)

Reservation.create(
  {
    check_in: '24/10/2024',
    check_out: '26/10/2024',
    persons: 3,
    user_id: '671a34b868c70e547a41935b',
    room_id: '671a832ab0b2bdc7483a47b0'
  }
)
export default Reservation
