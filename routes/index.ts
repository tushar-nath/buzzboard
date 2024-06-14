import { Router } from 'express'

export const v1Router = Router()

/*** Healthcheck Route ***/
v1Router.get('/healthcheck', (_req, res) => {
  res.send({ success: true })
})
/*** Healthcheck Route ***/

/*** User Routes ***/
