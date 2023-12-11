const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/submitRoute', {
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite:{
        '^/submitRoute' : ''
      }
    }),
  );
};