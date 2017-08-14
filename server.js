require('require-self-ref');

require('marko/express');
require('marko/node-require');
require('lasso/node-require-no-op').enable('.scss', '.sass', '.less', '.css');

var path = require('path');
var lasso = require('lasso');

var cookieParser = require('koa-cookie').default;
var staticCache = require('koa-static-cache');
var mount = require('koa-mount');

var Koa = require('koa');
var app = new Koa();
var router = require('koa-router')();

app.port = process.env.PORT || 3100;
app.isProduction = app.env === 'production';

lasso.configure({
  plugins: [
    'lasso-less',
    'lasso-marko'
  ],
  outputDir: __dirname + '/static',
  urlPrefix: "/static",
  bundlingEnabled: app.isProduction,
  minify: app.isProduction,
  fingerprintsEnabled: app.isProduction,
  bundles: []
});

app.use(mount('/static', staticCache({
  dir: __dirname + '/static',
  maxAge: 365 * 24 * 60 * 60,
  gzip: true,
  buffer: true,
  dynamic: true
})));

app.use(cookieParser());

var demoTemplate = require('./src/pages/demo/template.marko');
router.get(['/demo', '/'], async (ctx, next) => {
  ctx.type = "html"
  ctx.body = demoTemplate.stream({});
});


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(app.port, function(err) {
  if (err) { throw err; }
  if (process.send) { process.send('online'); }
  console.log('Listening on port %d', app.port);
});
