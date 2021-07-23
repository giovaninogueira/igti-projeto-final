import express from 'express'
import { ProfileController } from '../controllers/profile.controller'
import { userMiddleware } from '../middlewares/user.middleware'

const profileController = new ProfileController()
const router = express.Router()

router.put('/profile', userMiddleware, profileController.update.bind(profileController))

export { router }
