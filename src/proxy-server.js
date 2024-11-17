const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

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
  console.log('Lokaler Proxy läuft auf http://localhost:3001');
});
