var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../devServer');
var should = chai.should();

chai.use(chaiHttp);

describe('forms', function() {
  it('should list ALL forms on /forms GET', function(done) {
    chai.request(server)
      .get('/forms')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
  });

  it('should add a SINGLE form on /forms POST and get a SINGLE form on /form/:id GET', function(done) {
    chai.request(server)
      .post('/forms')
      .send({ music: 'raga' })
      .end(function(err, res) {
        var id = res.body.id;

        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');

        chai.request(server)
          .get(`/form/${id}`)
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('music');
            res.body.music.should.equal('raga');

            done();
          });
      });
  });
});
