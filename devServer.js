var _ = require('lodash');
var bodyParser = require('body-parser');
var co = require('co');
var express = require('express');
var path = require('path');
var r = require('rethinkdbdash')();
var webpack = require('webpack');

var config = require('./webpack.config.dev');
var nodeEnv = process.env.NODE_ENV;

var port = 3000;

if (!_.isEmpty(nodeEnv) && nodeEnv == 'test') {
  port = 4000;
};

const db = 'tamim';
const table = 'ragas';

var app = express();
var compiler = webpack(config);

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded

// handle Bad JSON
app.use(function(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.log('Bad JSON');
    next();
  }
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, '/src')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/ragas', function(req, res) {
  co(function *() {
    yield r.db(db)
      .table(table)
      .run()
      .then(function(result) {
        res.json(result);
      });
  });
});


app.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;
