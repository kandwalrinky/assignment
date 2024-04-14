import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/User";

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IUser>({
  firstName: {
    type: String,
    require: true,
    trim: true,
    min: 3,
    max: 20,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
  },
  mobile: {
    type: Number,
  },
  address: {
    type: String,
  }
}, {
  versionKey: false,
  timestamps: {
    currentTime: () => Math.floor(Date.now() / 1000)
  }
});

export const UserModel = model<IUser>('User', schema);





