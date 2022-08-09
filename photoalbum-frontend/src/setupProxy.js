const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [

    "/api/weatherforecast",
    "/api/photos",


];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7293',
        secure: false
    });
    console.log(appProxy);
    app.use(appProxy);
};
