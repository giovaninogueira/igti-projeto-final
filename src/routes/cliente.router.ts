import express from 'express'
import { ClienteController } from '../controllers/cliente.controller'

const clienteController = new ClienteController()
const router = express.Router()

router.get('/clientes', clienteController.get.bind(clienteController))
router.get('/cliente/:id', clienteController.find.bind(clienteController))
router.post('/cliente', clienteController.store.bind(clienteController))
router.put('/cliente/:id', clienteController.update.bind(clienteController))
router.delete('/cliente/:id', clienteController.delete.bind(clienteController))

export { router }
