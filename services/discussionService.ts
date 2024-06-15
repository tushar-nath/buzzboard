import clientPromise from '../lib/mongo'
import Discussion from '../models/discussionModel'
import { IDiscussion } from '../types'

export class DiscussionService {
  static async createDiscussion(
    text: string,
    image: string,
    hashtags: string[],
    author: string
  ): Promise<IDiscussion> {
    try {
      await clientPromise
      const discussion = new Discussion({ text, image, hashtags, author })
      const savedDiscussion = await discussion.save()
      return savedDiscussion
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async updateDiscussion(
    discussionId: string,
    updates: Partial<IDiscussion>
  ): Promise<IDiscussion | null> {
    try {
      await clientPromise
      const discussion = await Discussion.findByIdAndUpdate(
        discussionId,
        updates,
        { new: true }
      )
      return discussion
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async deleteDiscussion(discussionId: string): Promise<void> {
    try {
      await clientPromise
      await Discussion.findByIdAndDelete(discussionId)
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async listDiscussionsByTags(tags: string[]): Promise<IDiscussion[]> {
    try {
      await clientPromise
      const discussions = await Discussion.find({
        hashtags: { $in: tags },
      }).exec()
      return discussions
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async listDiscussionsByText(text: string): Promise<IDiscussion[]> {
    try {
      await clientPromise
      const discussions = await Discussion.find({ text: new RegExp(text, 'i') })
      return discussions
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async incrementViewCount(
    discussionId: string
  ): Promise<IDiscussion | null> {
    try {
      await clientPromise
      const discussion = await Discussion.findByIdAndUpdate(
        discussionId,
        { $inc: { viewCount: 1 } },
        { new: true }
      )
      return discussion
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }
}
