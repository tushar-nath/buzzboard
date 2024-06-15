import { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  mobileNo: string
  email: string
  password: string
  followers: Schema.Types.ObjectId[]
  following: Schema.Types.ObjectId[]
}

export interface IDiscussion extends Document {
  text: string
  image: string
  hashtags: string[]
  createdOn: Date
  author: Schema.Types.ObjectId
  likes: Schema.Types.ObjectId[]
  comments: Schema.Types.ObjectId[]
  viewCount: number
}

export interface IComment extends Document {
  text: string
  author: Schema.Types.ObjectId
  discussion: Schema.Types.ObjectId
  likes: Schema.Types.ObjectId[]
  replies: Schema.Types.ObjectId[]
}
interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string
  }
}

declare module 'express-serve-static-core' {
  export interface Request extends AuthenticatedRequest {}
}
