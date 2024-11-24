import express from 'express'
import fetch from 'node-fetch'

const app = express()
const PORT = 3001 // Lokaler Port für deinen Proxy

// Proxy-Route
app.get('/proxy', async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).send('Fehler: Kein URL-Parameter angegeben.')
  }

  try {
    const response = await fetch(url)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error)
    res.status(500).send('Serverfehler beim Abrufen der Daten.')
  }
})

app.listen(PORT, () => {
  console.log(`Proxy läuft auf http://localhost:${PORT}`)
})
