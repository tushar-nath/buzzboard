import { Schema, model } from 'mongoose'
import { IDiscussion } from '../types'

const discussionSchema = new Schema<IDiscussion>({
  text: { type: String, required: true },
  image: { type: String },
  hashtags: [{ type: String }],
  createdOn: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  viewCount: { type: Number, default: 0 },
})

const Discussion = model<IDiscussion>('Discussion', discussionSchema)

export default Discussion
