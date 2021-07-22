import express from 'express'
import { router as client } from './cliente.router'

const router = express.Router()

router.use('/', client)

export default router
