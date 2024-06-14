import User from '../models/userModel'
import bcrypt from 'bcryptjs'
import { IUser } from '../types'
export class UserService {
  static async createUser(
    name: string,
    mobileNo: string,
    email: string,
    password: string
  ): Promise<IUser> {
    try {
      const existingUser = await User.findOne({
        $or: [{ mobileNo }, { email }],
      })
      if (existingUser) {
        throw new Error('User already exists')
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = new User({ name, mobileNo, email, password: hashedPassword })
      const savedUser = await user.save()
      return savedUser
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async updateUser(
    userId: string,
    updates: Partial<IUser>
  ): Promise<IUser | null> {
    try {
      const user = await User.findByIdAndUpdate(userId, updates, { new: true })
      return user
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async deleteUser(userId: string): Promise<void> {
    try {
      await User.findByIdAndDelete(userId)
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async listUsers(): Promise<IUser[]> {
    try {
      const users = await User.find()
      return users
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async searchUser(name: string): Promise<IUser[]> {
    try {
      const users = await User.find({ name: new RegExp(name, 'i') })
      return users
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }
}
