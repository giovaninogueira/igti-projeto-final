import express from 'express'
import { VendaController } from '../controllers/venda.controller'
import { adminMiddleware } from '../middlewares/admin.middleware'
import { userMiddleware } from '../middlewares/user.middleware'

const vendaController = new VendaController()
const router = express.Router()

router.post('/comprar', userMiddleware, vendaController.store.bind(vendaController))
router.get('/compras', userMiddleware, vendaController.get.bind(vendaController))
router.get('/compra/:id', adminMiddleware, vendaController.find.bind(vendaController))
router.get('/compras/cliente/:clienteId', adminMiddleware, vendaController.filter.bind(vendaController))
router.get('/compras/livro/:livroId', adminMiddleware, vendaController.filterLivro.bind(vendaController))
router.get('/compras/autor/:autorId', adminMiddleware, vendaController.filterAutor.bind(vendaController))

export { router }
