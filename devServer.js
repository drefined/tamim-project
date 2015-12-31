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

if (!_.isEmpty(nodeEnv) && nodeEnv === 'test') {
  port = 4000;
}

const db = 'tamim';
const table = 'ragas';

var app = express();
var compiler = webpack(config);

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded

// handle Bad JSON
app.use(function (err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.log('Bad JSON');
    next();
  }
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, '/src')));

app.get('/', function index(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/ragas', function listRagas(req, res) {
  co(function *() {
    yield r.db(db)
      .table(table)
      .run()
      .then(function (result) {
        res.json(result);
      });
  });
});

app.post('/ragas', function addRaga(req, res) {
  co(function *() {
    var body = req.body;

    if (!_.isEmpty(body) && _.isObject(body)) {
      yield r.db(db)
        .table(table)
        .insert(body)
        .run()
        .then(function (result) {
          var ragaId = _.first(result.generated_keys);
          res.json({ id: ragaId });
        })
        .catch(function (e) {
          res.status(500).json({ error: 'something bad happened.' });
        });
    } else {
      res.status(406).json({ error: 'request contained bad json or empty body.' });
    }
  });
});

app.put('/ragas/:id', function updateRaga(req, res) {
  co(function *() {
    var id = req.params.id;
    var body = req.body;

    if (!_.isEmpty(body) && _.isObject(body)) {
      yield r.db(db)
        .table(table)
        .get(id)
        .update(body)
        .run()
        .then(function (result) {
          res.json(result);
        })
        .catch(function (e) {
          res.status(500).json({ error: 'something bad happened.' });
        });
    } else {
      res.status(406).json({ error: 'request contained bad json or empty body.' });
    }
  });
});

app.delete('/ragas/:id', function deleteRaga(req, res) {
  co(function *() {
    var id = req.params.id;

    yield r.db(db)
      .table(table)
      .get(id)
      .delete()
      .run()
      .then(function (result) {
        res.json(result);
      })
      .catch(function (e) {
        res.status(500).json({ error: 'something bad happened.' });
      });
  });
});

app.listen(port, 'localhost', function startServer(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;
