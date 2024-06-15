import { Router } from 'express'
import { Discussions } from '../handlers/discussionHandler'
import authMiddleware from '../middleware/authMiddleware'

const router = Router()

router.post('/', authMiddleware, Discussions.createDiscussion)
router.put('/:id', authMiddleware, Discussions.updateDiscussion)
router.delete('/:id', authMiddleware, Discussions.deleteDiscussion)
router.get('/tags', Discussions.listDiscussionsByTags)
router.get('/text', Discussions.listDiscussionsByText)
router.put('/:id/view', Discussions.incrementViewCount)

export default router
