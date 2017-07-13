require('require-self-ref');

require('marko/express');
require('marko/node-require');
require('lasso/node-require-no-op').enable('.scss', '.sass', '.less', '.css');

var path = require('path');
var express = require('express');
var lasso = require('lasso');
var cookieParser = require('cookie-parser');

var serveStatic = require('serve-static');
var isProduction = process.env.NODE_ENV === 'production';

var app = express();
app.locals.port = process.env.PORT || 3000;
app.locals.rootPath = path.join("/" + (process.env.ORDERS_NAME || ""));

lasso.configure({
  plugins: [
    'lasso-less',
    'lasso-marko'
  ],
  outputDir: path.join(__dirname, '/static'),
  urlPrefix: path.join("/" + (process.env.ORDERS_NAME || ""), "static"),
  bundlingEnabled: isProduction,
  minify: isProduction,
  fingerprintsEnabled: isProduction,
  bundles: []
});

app.use(cookieParser());

app.get('/diagnostic', function(req, res){
  return res.sendStatus(200);
});

app.use('/static', serveStatic(__dirname + '/static'));

app.use(function (err, req, res, next) {
  var errorTemplate = require("./src/pages/error/template.marko");
  res.marko(errorTemplate, {error: err});
})

// a bit ghetto
app.listen(app.locals.port, function(err) {
  if (err) {
    throw err;
  }

  if (process.send) {
    process.send('online');
  }

  console.log('Listening on port %d', app.locals.port);
});