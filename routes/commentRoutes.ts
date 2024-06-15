import { Router } from 'express'
import { Comments } from '../handlers/commentHandler'
import authMiddleware from '../middleware/authMiddleware'

const router = Router()

router.post('/', authMiddleware, Comments.createComment)
router.put('/:id/like', authMiddleware, Comments.likeComment)
router.post('/:id/reply', authMiddleware, Comments.replyToComment)
router.put('/:id', authMiddleware, Comments.updateComment)

export default router
