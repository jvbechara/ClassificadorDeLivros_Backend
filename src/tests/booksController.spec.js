var expect  = require("chai").expect;
var request = require("request");
const app = require('../../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
var runOrder = 1;

chai.use(chaiHttp);

var id = '';

function assertRunOrder(expectedRunOrder) {
    assert.equal(runOrder++, expectedRunOrder);
}


describe("POST", function() {
    it("Espera resposta 200 ok", (done) => {
        assertRunOrder(1);
        let book = {
            "title": "xxxx",
            "author": "aaa",
            "edition": "first"
        }
        chai.request(app)
            .post("/book-create")
            .send(book)
            .end(function(error, response, body){
                id = response.body._id;
                //console.log(id);
                expect(response.statusCode).to.equal(200);
            })
        done();
    });

    it("Espera resposta 400", (done) => {
        assertRunOrder(2);
        let book = {
            "title": "xxxxx",
        }
        chai.request(app)
            .post("/book-create")
            .send(book)
            .end(function(error, response, body){
                expect(response.statusCode).to.equal(400);
            })
        done();
    });
});



describe("GET BOOKS", function() {
    it("Espera resposta 200 ok", (done) => {
        assertRunOrder(3);
        chai.request(app)
        .get('/book')
        .end(function(err, response){
          expect(response.statusCode).to.equal(200);
          //expect('Location', '/');
          //xtoken = response.body.token;
        });
        done();
    });
    it("Espera resposta 404", (done) => {
        assertRunOrder(4);
        chai.request(app)
        .get('/boo')
        .end(function(err, response){
          expect(response.statusCode).to.equal(404);
          //expect('Location', '/signin');
          //xtoken = response.body.token;
        });
        done();
    });
});


describe("getBook", function() {
    it("Espera resposta 200 da função GetSerie", function() {
        assertRunOrder(5);

        chai.request(app)
        .get('/book/'+ id)
        .end(function(err, response){
          expect(response.statusCode).to.equal(200);
          //expect('Location', '/');
          //xtoken = response.body.token;
        });
    });


    it("Espera resposta 404 - Não encontrado", function() {
        assertRunOrder(6);

        chai.request(app)
        .get('/book/xx')
        .end(function(err, response){
          expect(response.statusCode).to.equal(400);
          //expect('Location', '/');
          //xtoken = response.body.token;
        });
    });
});



describe("PUT", function() {
    it("PUT - Espera resposta 200 ok", (done) => {
        assertRunOrder(7);
        //console.log(id);
        let book = {
            "title": "zzz"
        }

        chai.request(app)
            .put('/book/5cb2b431163f4908d2e118a0')
            .send(book)
            .end(function(error, response, body){
                expect(response.statusCode).to.equal(200);
            })
        done();
    });

    it("Espera resposta 400 ok", (done) => {
        assertRunOrder(8);

        let book = {
            "title": "yyy"
        }
        chai.request(app)
            .put("/book/xxx")
            .send(book)
            .end(function(error, response, body){
                expect(response.statusCode).to.equal(400);
            })
        done();
    });
});



describe("Destroy", function() {
    it("Espera resposta 200 ok", (done) => {

        chai.request(app)
            .delete("/book/5cb2b431163f4908d2e118a0")
            .end(function(error, response, body){
                expect(response.statusCode).to.equal(200);
            })
        done();
    });
    it("Espera resposta 400 ok", (done) => {
        chai.request(app)
            .del("/book/xxx")
            .end(function(error, response, body){
                expect(response.statusCode).to.equal(400);
            })
        done();
    });
});