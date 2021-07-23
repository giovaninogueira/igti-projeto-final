import express from 'express'
import { AutorController } from '../controllers/autor.controller'
import { adminMiddleware } from '../middlewares/admin.middleware'

const autorController = new AutorController()
const router = express.Router()

router.get('/autores', adminMiddleware, autorController.get.bind(autorController))
router.get('/autor/:id', adminMiddleware, autorController.find.bind(autorController))
router.post('/autor', adminMiddleware, autorController.store.bind(autorController))
router.put('/autor/:id', adminMiddleware, autorController.update.bind(autorController))
router.delete('/autor/:id', adminMiddleware, autorController.delete.bind(autorController))

export { router }
