import { Request, Response } from 'express'
import { DiscussionService } from '../services/discussionService'

export class Discussions {
  static async createDiscussion(req: Request, res: Response) {
    try {
      const { text, image, hashtags, author } = req.body
      const discussion = await DiscussionService.createDiscussion(
        text,
        image,
        hashtags,
        author
      )
      res.status(201).json({ discussion })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async updateDiscussion(req: Request, res: Response) {
    try {
      const discussionId = req.params.id
      const updates = req.body
      const discussion = await DiscussionService.updateDiscussion(
        discussionId,
        updates
      )
      res.status(200).json({ discussion })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async deleteDiscussion(req: Request, res: Response) {
    try {
      const discussionId = req.params.id
      await DiscussionService.deleteDiscussion(discussionId)
      res.status(204).send()
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async listDiscussions(req: Request, res: Response) {
    try {
      const discussions = await DiscussionService.listDiscussions()
      res.status(200).json({ discussions })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async listDiscussionsByTags(req: Request, res: Response) {
    try {
      const { tags } = req.query
      const discussions = await DiscussionService.listDiscussionsByTags(
        tags as string[]
      )
      res.status(200).json({ discussions })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async listDiscussionsByText(req: Request, res: Response) {
    try {
      const { text } = req.query
      const discussions = await DiscussionService.listDiscussionsByText(
        text as string
      )
      res.status(200).json({ discussions })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async incrementViewCount(req: Request, res: Response) {
    try {
      const discussionId = req.params.id
      const discussion = await DiscussionService.incrementViewCount(
        discussionId
      )
      res.status(200).json({ discussion })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }
}
