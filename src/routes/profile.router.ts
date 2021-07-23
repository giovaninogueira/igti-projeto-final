import express from 'express'
import { ProfileController } from '../controllers/profile.controller'
import { VendaController } from '../controllers/venda.controller'
import { userMiddleware } from '../middlewares/user.middleware'

const vendaController = new VendaController()
const profileController = new ProfileController()
const router = express.Router()

router.put('/profile', userMiddleware, profileController.update.bind(profileController))
router.get('/profile/vendas', userMiddleware, vendaController.filterCliente.bind(vendaController))

export { router }
