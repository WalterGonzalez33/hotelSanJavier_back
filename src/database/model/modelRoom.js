import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
  room_name: {
    type: String,
    required: true,
    enum: [
      "Dobles Superiores",
      "Departamentos",
      "Doble de Lujo",
      "Suite Superior",
    ],
    //unique:true
  },
  price: {
    type: Number,
    required: true,
    min: 5000,
    max: 1000000,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/.test(value)
      },
    },
  },
  brief_description: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  broad_description: {
    type: String,
    required: true,
    minLength: 50,
    maxLength: 1000,
  },
});

const Room = mongoose.model("room", roomSchema);

export default Room;
