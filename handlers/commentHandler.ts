import { Request, Response } from 'express'
import { CommentService } from '../services/commentService'

export class Comments {
  static async createComment(req: Request, res: Response) {
    try {
      const { text, discussionId } = req.body
      const userId = req.user!.id
      const comment = await CommentService.createComment(
        text,
        userId,
        discussionId
      )
      res.status(201).json({ comment })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async likeComment(req: Request, res: Response) {
    try {
      const commentId = req.params.id
      const userId = req.user!.id
      const comment = await CommentService.likeComment(commentId, userId)
      res.status(200).json({ comment })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async replyToComment(req: Request, res: Response) {
    try {
      const { text } = req.body
      const userId = req.user!.id
      const commentId = req.params.id
      const reply = await CommentService.replyToComment(text, userId, commentId)
      res.status(201).json({ reply })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async updateComment(req: Request, res: Response) {
    try {
      const commentId = req.params.id
      const updates = req.body
      const comment = await CommentService.updateComment(commentId, updates)
      res.status(200).json({ comment })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }
}
