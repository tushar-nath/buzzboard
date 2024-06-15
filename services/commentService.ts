import mongoose, { Schema, Types } from 'mongoose'
import Comment from '../models/commentModel'
import { IComment } from '../types'
import clientPromise from '../lib/mongo'

export class CommentService {
  static async createComment(
    text: string,
    author: string,
    discussion: string
  ): Promise<IComment> {
    try {
      await clientPromise
      const authorId = new mongoose.Types.ObjectId(author)
      const discussionId = new mongoose.Types.ObjectId(discussion)

      const comment = new Comment({
        text,
        author: authorId,
        discussion: discussionId,
      })
      await comment.save()
      return comment
    } catch (error: any) {
      console.error('Error creating comment:', error)
      throw error
    }
  }

  static async likeComment(
    commentId: string,
    userId: string
  ): Promise<IComment> {
    try {
      await clientPromise
      const commentObjectId = new mongoose.Types.ObjectId(commentId)
      const userObjectId = new mongoose.Types.ObjectId(userId)

      const comment = await Comment.findById(commentObjectId)
      if (!comment) throw new Error('Comment not found')

      comment.likes.push(userObjectId as any)
      await comment.save()
      return comment
    } catch (error: any) {
      console.error('Error liking comment:', error)
      throw error
    }
  }

  static async replyToComment(
    text: string,
    author: string,
    commentId: string
  ): Promise<IComment> {
    try {
      await clientPromise
      const authorId = new mongoose.Types.ObjectId(author)
      const parentCommentId = new mongoose.Types.ObjectId(commentId)

      const reply = new Comment({
        text,
        author: authorId,
        discussion: parentCommentId, // The parent comment's discussion id should be inherited
      })

      const parentComment = await Comment.findById(parentCommentId)
      if (!parentComment) throw new Error('Parent comment not found')

      parentComment.replies.push(reply._id as any)
      await reply.save()
      await parentComment.save()
      return reply
    } catch (error: any) {
      console.error('Error replying to comment:', error)
      throw error
    }
  }

  static async updateComment(
    commentId: string,
    updates: Partial<IComment>
  ): Promise<IComment | null> {
    try {
      await clientPromise
      const comment = await Comment.findByIdAndUpdate(commentId, updates, {
        new: true,
      })
      return comment
    } catch (error: any) {
      console.error('Error updating comment:', error)
      throw error
    }
  }
}
