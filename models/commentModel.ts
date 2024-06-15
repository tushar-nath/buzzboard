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
  replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
})

const Comment = model<IComment>('Comment', commentSchema)

export default Comment
