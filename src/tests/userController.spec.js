var expect  = require("chai").expect;
const app = require('../../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
var request = require('supertest');

var runOrder = 1;
function assertRunOrder(expectedRunOrder) {
    assert.equal(runOrder++, expectedRunOrder);
}

chai.use(chaiHttp);

var xtoken = '';
//let's set up the data we need to pass to the login method
//now let's login the user before we run any tests
var authenticatedUser = request.agent(app);

const userCredentials = {
    "name": "ana",
    "email": "ana1@gmail.com", 
    "password": "124"
}

var id = "";

describe("POST USER", function() {
    it("Espera resposta 200 ok", (done) => {
        assertRunOrder(1);
           
        chai.request(app)
            .post('/user')
            .send(userCredentials)
            .end(function(err, response){
                id = response.body._id;
                expect(response.statusCode).to.equal(200);
            });
            done();
    });

    it("Espera resposta 200 ok", (done) => {
        assertRunOrder(2);
        const userCredentials = {
            "email": "ana@gmail.com", 
            "password": "123"
        }
           
        chai.request(app)
            .post('/user')
            .send(userCredentials)
            .end(function(err, response){
                expect(response.statusCode).to.equal(400);
            });
            done();
    });
});

describe("POST LOGIN USER", function() {
    it("Espera resposta 200 ok", (done) => {
        assertRunOrder(3);
        authenticatedUser
        .post('/user/authenticate')
        .send(userCredentials)
        .end(function(err, response){
          expect(response.statusCode).to.equal(201);
          expect('Location', '/');
          xtoken = response.body.token;
        });
        done();
    });
    it("Espera resposta 200 ok", (done) => {
        assertRunOrder(4);
        authenticatedUser
        .post('/user/authenticate')
        .send({
            "name": "Ana",
            "password": "124"
        })
        .end(function(err, response){
          expect(response.statusCode).to.equal(404);
          expect('Location', '/signin');
          //console.log(id)
          xtoken = response.body.token;
        });
        done();
    });
});

describe("GET USER", function() {
    it("Espera resposta 200 ok", (done) => {
        assertRunOrder(5);
        authenticatedUser
        .get('/user/5cb0d354829c5150c46a9a93')
        .end(function(err, response){
          expect(response.statusCode).to.equal(200);
          //expect('Location', '/');
          //xtoken = response.body.token;
        });
        done();
    });
    it("Espera resposta 404", (done) => {
        assertRunOrder(6);
        authenticatedUser
        .get('/user/fff')
        .end(function(err, response){
          expect(response.statusCode).to.equal(404);
          //expect('Location', '/signin');
          //xtoken = response.body.token;
        });
        done();
    });
});