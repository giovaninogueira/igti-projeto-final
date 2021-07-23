import express from 'express'
import { ClienteController } from '../controllers/cliente.controller'
import { adminMiddleware } from '../middlewares/admin.middleware'

const clienteController = new ClienteController()
const router = express.Router()

router.get('/clientes', adminMiddleware, clienteController.get.bind(clienteController))
router.get('/cliente/:id', adminMiddleware, clienteController.find.bind(clienteController))
router.post('/cliente', adminMiddleware, clienteController.store.bind(clienteController))
router.put('/cliente/:id', adminMiddleware, clienteController.update.bind(clienteController))
router.delete('/cliente/:id', adminMiddleware, clienteController.delete.bind(clienteController))

export { router }
