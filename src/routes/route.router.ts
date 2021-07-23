import express from 'express'
import { router as client } from './cliente.router'
import { router as autor } from './autor.router'
import { router as livro } from './livro.router'
import { router as livroInfo } from './livro-info.router'
import { router as auth } from './auth.router'
import { router as profile } from './profile.router'
import { router as venda } from './venda.router'

const router = express.Router()

router.use(
  '/',
  client,
  autor,
  livro,
  livroInfo,
  auth,
  profile,
  venda
)

export default router
