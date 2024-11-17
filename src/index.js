// index.js - Node.js-Server und Proxy-Setup

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy-Server-Setup
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://www.geoportal.rlp.de',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // Entfernt /api aus dem Pfad
    },
  })
);

app.listen(3001, () => {
  console.log('Anwendung und Proxy laufen auf http://localhost:3001');
});
