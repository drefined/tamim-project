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
const table = 'music_therapy';

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

console.log(path.join(__dirname, '/src'));

app.use(express.static(path.join(__dirname, '/src')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/forms', function(req, res) {
  co(function *() {
    yield r.db(db)
      .table(table)
      .orderBy({ index: r.desc('createdAt') })
      .run()
      .then(function(result) {
        res.json(result);
      });
  });
});

app.post('/forms', function(req, res) {
  co(function *() {
    var body = req.body;

    if (!_.isEmpty(body) && _.isObject(body)) {
      body.createdAt = new Date();

      yield r.db(db)
        .table(table)
        .insert(body)
        .run()
        .then(function(result) {
          var id = _.first(result.generated_keys);
          res.json({ id: id });
        })
        .catch(function(e) {
          res.status(500).json({ error: 'something bad happened.' });
        });
    } else {
      res.status(406).json({ error: 'request contained bad json or empty body.' });
    }
  });
});

app.get('/form/:id', function(req, res) {
  co(function *() {
    var id = req.params.id;

    yield r.db(db)
      .table(table)
      .get(id)
      .run()
      .then(function(result) {
        if (_.isEmpty(result)) {
          res.status(404).json({ error: `form ${id} not found.` });
        } else {
          res.json(result);
        }
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
