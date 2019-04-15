var expect  = require("chai").expect;
//var request = require("request");
const app = require('../../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
var request = require('supertest');

var authenticatedUser = request.agent(app);

var runOrder = 1;

chai.use(chaiHttp);

var id = '';

const userCredentials = {
    "name": "joao",
    "email": "joao@gmail.com", 
    "password": "1"
}

function assertRunOrder(expectedRunOrder) {
    assert.equal(runOrder++, expectedRunOrder);
}

before(function(done){
    authenticatedUser
      .post('/user/authenticate')
      .send(userCredentials)
      .end(function(err, response){
        expect(response.statusCode).to.equal(201);
        expect('Location', '/');
        xtoken = response.body.token;
        done();
      });
});



describe("POST", function() {
    it("Espera resposta 200 ok", (done) => {
        assertRunOrder(1);
        let comment = {
            "comments": "xxxx"
        }
        chai.request(app)
            .post("/comments/5caf61c80c031b3c54cbfd24")
            .set('xtoken', xtoken)
            .send(comment)
            .end(function(error, response, body){
                id = response.body._id;
                expect(response.statusCode).to.equal(200);
            })
        done();
    });

    it("Espera resposta 400", (done) => {
        assertRunOrder(2);
        let comment = {
        }
        chai.request(app)
            .post("/comments/5caf61c80c031b3c54cbfd24")
            .set('xtoken', xtoken)
            .send(comment)
            .end(function(error, response, body){
                expect(response.statusCode).to.equal(400);
            })
        done();
    });
});



describe("GET COMMENTS", function() {
    it("Espera resposta 200 ok", (done) => {
        assertRunOrder(3);
        chai.request(app)
        .get('/comments')
        .end(function(err, response){
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
    it("Espera resposta 404", (done) => {
        assertRunOrder(4);
        chai.request(app)
        .get('/commen')
        .end(function(err, response){
          expect(response.statusCode).to.equal(404);
          done();
        });
    });
});

describe("DESTROY", function() {
    it("Espera resposta 200 ok", (done) => {
        assertRunOrder(5);
        chai.request(app)
            .delete("/comments/"+id)
            .end(function(error, response, body){
                expect(response.statusCode).to.equal(200);
            })
        done();
    });
    it("Espera resposta 400 ok", (done) => {
        assertRunOrder(6);
        chai.request(app)
            .del("/comments/xxx")
            .end(function(error, response, body){
                expect(response.statusCode).to.equal(400);
            })
        done();
    });
});