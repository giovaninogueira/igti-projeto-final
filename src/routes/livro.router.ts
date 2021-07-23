import express from 'express'
import { LivroController } from '../controllers/livro.controller'

const livroController = new LivroController()
const router = express.Router()

router.post('/livro', livroController.store.bind(livroController))
router.put('/livro/:id', livroController.update.bind(livroController))

export { router }
