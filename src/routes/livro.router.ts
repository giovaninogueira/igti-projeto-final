import express from 'express'
import { LivroController } from '../controllers/livro.controller'
import { adminMiddleware } from '../middlewares/admin.middleware'

const livroController = new LivroController()
const router = express.Router()

router.get('/livros', adminMiddleware, livroController.get.bind(livroController))
router.get('/livros/:autorId', adminMiddleware, livroController.filter.bind(livroController))
router.get('/livro/:id', adminMiddleware, livroController.find.bind(livroController))
router.post('/livro', adminMiddleware, livroController.store.bind(livroController))
router.put('/livro/:id', adminMiddleware, livroController.update.bind(livroController))
router.delete('/livro/:id', adminMiddleware, livroController.delete.bind(livroController))

export { router }
