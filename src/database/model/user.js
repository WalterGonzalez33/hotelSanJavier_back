import mongoose from "mongoose";

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
        );
      },
    },
  },
  password: {
    type: String,
    trim: true,
    require: true,
    minLength: 6,
    validate: {
        validator: (value) => {
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)
        }
    }
  },
});
const User = mongoose.model("User", userSchema);
export default User;
