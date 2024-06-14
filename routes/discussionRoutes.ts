import { Router } from 'express'
import { Discussions } from '../handlers/discussionHandler'

const router = Router()

router.post('/', Discussions.createDiscussion)
router.put('/:id', Discussions.updateDiscussion)
router.delete('/:id', Discussions.deleteDiscussion)
router.get('/tags', Discussions.listDiscussionsByTags)
router.get('/text', Discussions.listDiscussionsByText)

export default router
