import { Schema, model } from 'mongoose'
import { IComment } from '../types'

const commentSchema = new Schema<IComment>({
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  discussion: {
    type: Schema.Types.ObjectId,
    ref: 'Discussion',
    required: true,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdOn: { type: Date, default: Date.now },
})

const Comment = model<IComment>('Comment', commentSchema)

export default Comment
