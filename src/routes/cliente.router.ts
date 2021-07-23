import express from 'express'
import { ClienteController } from '../controllers/cliente.controller'

const clienteController = new ClienteController()
const router = express.Router()

router.post('/cliente', clienteController.store.bind(clienteController))

export { router }
