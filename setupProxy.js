// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/coingecko',
    createProxyMiddleware({
      target: 'https://api.coingecko.com/api/v3',
      changeOrigin: true,
      pathRewrite: {
        '^/api/coingecko': '',
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Access-Control-Allow-Origin', '*');
      },
    })
  );
};
