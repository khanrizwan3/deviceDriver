var expect  = require('chai').expect;
var request = require('request');
var chai = require('chai');


it('Main page content', function(done) {
    chai.request('http://localhost:7071')
    .post('/event')
    .send({'s':'s'})
    .end(function(error, response) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});
