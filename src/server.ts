import { App } from './app'
(async () => {
  const app = new App()
  const server = await app.init()
  server.listen(3000, () => console.log('API Running...'))
})()
