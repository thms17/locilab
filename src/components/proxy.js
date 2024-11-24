import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://www.geoportal.rlp.de', // Ziel-API
    changeOrigin: true, // CORS umgehen
    pathRewrite: {
      '^/api': '', // Entfernt "/api" vom Pfad
    },
  })
)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Proxy läuft auf http://localhost:${PORT}`)
})
