var co = require('co');
var r = require('rethinkdbdash')();

const db = 'tamim';
const table = 'music_therapy';

co(function *() {
  try {
    yield r.dbList()
      .contains(db)
      .do(function(databaseExists) {
        return r.branch(databaseExists, r.dbDrop(db), { created: 1 });
      });

    yield r.dbCreate(db);

    console.log(`Database '${db}' created`);

    yield r.db(db
      .tableCreate(table);

    console.log(`Table '${table}' created`);

  } catch (e) {
    console.log(e.message);
  }

  yield r.getPool().drain();
});
