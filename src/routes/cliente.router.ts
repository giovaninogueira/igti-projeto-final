import express from 'express'

const router = express.Router()

router.get('/teste', (req, res) => {
  return res.send('oii')
})

export { router }
