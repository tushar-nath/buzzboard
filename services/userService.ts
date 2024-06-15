import User from '../models/userModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { IUser } from '../types'
import { Types } from 'mongoose'
import clientPromise from '../lib/mongo'

export class UserService {
  static async signup(
    name: string,
    mobileNo: string,
    email: string,
    password: string
  ): Promise<IUser> {
    try {
      await clientPromise
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

  static async login(email: string, password: string) {
    await clientPromise
    const user = await User.findOne({ email })
    if (!user) throw new Error('User not found')
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw new Error('Invalid credentials')
    const token = this.generateToken(user)
    return { user, token }
  }

  static generateToken(user: any) {
    return jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' })
  }

  static async updateUser(
    userId: string,
    updates: Partial<IUser>
  ): Promise<IUser | null> {
    try {
      await clientPromise
      const user = await User.findByIdAndUpdate(userId, updates, { new: true })
      return user
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async deleteUser(userId: string): Promise<void> {
    try {
      await clientPromise
      await User.findByIdAndDelete(userId)
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async listUsers(): Promise<IUser[]> {
    try {
      await clientPromise
      const users = await User.find()
      return users
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async searchUser(name: string): Promise<IUser[]> {
    try {
      await clientPromise
      const users = await User.find({ name: new RegExp(name, 'i') })
      return users
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async followUser(userId: string, followUserId: string) {
    try {
      await clientPromise
      const userObjectId = new Types.ObjectId(userId)
      const followUserObjectId = new Types.ObjectId(followUserId)

      const user = await User.findById(userObjectId)
      const followUser = await User.findById(followUserObjectId)
      if (!user || !followUser) throw new Error('User not found')

      user.followers.push(followUserObjectId as any)
      await user.save()
      return user
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }
}
