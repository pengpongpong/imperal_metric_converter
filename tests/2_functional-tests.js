const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test("convert valid input 10L", (done) => {
        chai
            .request(server)
            .get("/api/convert?input=10L")
            .end((err, res) => {
                assert.equal(res.body.string, "10 liters converts to 2.64172 gallons");
                done();
            })
    });
    test("convert invalid input 32g", (done) => {
        chai
            .request(server)
            .get("/api/convert?input=32g")
            .end((err, res) => {
                assert.equal(res.body, "invalid unit");
                done();
            })
    });
    test("convert invalid number", (done) => {
        chai
            .request(server)
            .get("/api/convert?input=3/7.2/4kg")
            .end((err, res) => {
                assert.equal(res.body, "invalid number");
                done();
            })
    });
    test("convert invalid number and unit", (done) => {
        chai
            .request(server)
            .get("/api/convert?input=3/7.2/4kilomegagram")
            .end((err, res) => {
                assert.equal(res.body, "invalid number and unit");
                done();
            })
    });
    test("convert unit with no number", (done) => {
        chai
            .request(server)
            .get("/api/convert?input=kg")
            .end((err, res) => {
                assert.equal(res.body.string, "1 kilograms converts to 2.20462 pounds");
                done();
            })
    });
});
