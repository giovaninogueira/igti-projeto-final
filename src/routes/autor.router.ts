import express from 'express'
import { AutorController } from '../controllers/autor.controller'

const autorController = new AutorController()
const router = express.Router()

router.get('/autores', autorController.get.bind(autorController))
router.get('/autor/:id', autorController.find.bind(autorController))
router.post('/autor', autorController.store.bind(autorController))
router.put('/autor/:id', autorController.update.bind(autorController))
router.delete('/autor/:id', autorController.delete.bind(autorController))

export { router }
