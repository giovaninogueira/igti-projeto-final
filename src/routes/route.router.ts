import express from 'express'
import { router as client } from './cliente.router'
import { router as autor } from './autor.router'

const router = express.Router()

router.use(
  '/',
  client,
  autor
)

export default router
