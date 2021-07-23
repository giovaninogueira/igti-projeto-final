import express from 'express'
import { LivroInfoController } from '../controllers/livro-info.controller'
import { adminMiddleware } from '../middlewares/admin.middleware'

const livroController = new LivroInfoController()
const router = express.Router()

router.post('/livro/info', adminMiddleware, livroController.store.bind(livroController))
router.delete('/livro/info/:id', adminMiddleware, livroController.delete.bind(livroController))
router.post('/livro/:id/avaliacao', adminMiddleware, livroController.addAvaliacao.bind(livroController))
router.delete('/livro/:id/avaliacao/:index', adminMiddleware, livroController.removeAvaliacao.bind(livroController))

export { router }
