import express from 'express'
import { LivroInfoController } from '../controllers/livro-info.controller'

const livroController = new LivroInfoController()
const router = express.Router()

router.post('/livro/info', livroController.store.bind(livroController))
router.delete('/livro/info/:id', livroController.delete.bind(livroController))
router.post('/livro/:id/avaliacao', livroController.addAvaliacao.bind(livroController))
router.delete('/livro/:id/avaliacao/:index', livroController.removeAvaliacao.bind(livroController))

export { router }
