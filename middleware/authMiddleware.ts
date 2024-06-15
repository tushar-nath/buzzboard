import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) {
    return res.status(401).send({ error: 'Please authenticate.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
    req.user = { id: decoded.id, email: decoded.email }
    next()
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' })
  }
}

export default authMiddleware
