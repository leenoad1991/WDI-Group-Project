const { api, expect } = require('../spec_helper');


describe('GET /*', function() {
  it('should return a 200 response', function(done) {
    //this.skip();
    api
      .get('/')
      .set('Accept', 'application/html')
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should return a HTML', function(done) {
    //this.skip();
    api
      .get('/')
      .set('Accept', 'application/html')
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.headers['content-type'])
        .to.eq('text/html; charset=UTF-8');
        done();
      });
  });
  it('should return the correct index.html with the title appointments', function(done) {
    //this.skip();
    api
      .get('/')
      .set('Accept', 'application/html')
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.text)
        .to.contain('<title>WineEx</title>');
        done();
      });
  });
  it('Should return a correct endpoint even with a random strange endpoint being added', function(done) {
    //this.skip();
    api
    .get('/asaadsadasdjashdjkas')
    .set('Accept', 'application/html')
    .end((err, res) => {
      if(err) console.log(err);
      expect(res.text)
      .to.contain('<title>WineEx</title>');
      done();
    });
  });
});
