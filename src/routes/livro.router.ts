import express from 'express'
import { LivroController } from '../controllers/livro.controller'
import { adminMiddleware } from '../middlewares/admin.middleware'

const livroController = new LivroController()
const router = express.Router()

router.get('/livros', livroController.get.bind(livroController))
router.get('/livros/:autorId', livroController.filter.bind(livroController))
router.get('/livro/:id', livroController.find.bind(livroController))
router.post('/livro', adminMiddleware, livroController.store.bind(livroController))
router.put('/livro/:id', adminMiddleware, livroController.update.bind(livroController))
router.delete('/livro/:id', adminMiddleware, livroController.delete.bind(livroController))

export { router }
