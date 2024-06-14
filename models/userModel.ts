import { Schema, model } from 'mongoose'
import { IUser } from '../types'

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  mobileNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

const User = model<IUser>('User', userSchema)

export default User
