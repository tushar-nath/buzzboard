import { Router } from 'express'
import { Users } from '../handlers/userHandler'
import authMiddleware from '../middleware/authMiddleware'

const router = Router()

router.post('/signup', Users.signup)
router.post('/login', Users.login)
router.put('/:id', authMiddleware, Users.updateUser)
router.delete('/:id', authMiddleware, Users.deleteUser)
router.get('/', Users.listUsers)
router.get('/search', Users.searchUser)
router.put('/follow/:id', authMiddleware, Users.followUser)

export default router
