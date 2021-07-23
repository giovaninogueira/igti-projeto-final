import express from 'express'
import { LivroController } from '../controllers/livro.controller'

const livroController = new LivroController()
const router = express.Router()

router.get('/livros', livroController.get.bind(livroController))
router.get('/livros/:autorId', livroController.filter.bind(livroController))
router.get('/livro/:id', livroController.find.bind(livroController))
router.post('/livro', livroController.store.bind(livroController))
router.put('/livro/:id', livroController.update.bind(livroController))
router.delete('/livro/:id', livroController.delete.bind(livroController))

export { router }
