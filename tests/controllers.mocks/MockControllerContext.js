const sinon = require('sinon');
const { assert } = require('chai');

const MockRequest = require ("./MockRequest");
const MockResponse = require ("./MockResponse");
const main = require("../../controllers/mainController");

class MockControllerContext {
    constructor(requestBody) {
        this.req = new MockRequest(requestBody);
        this.res = new MockResponse();
        const context = {
            res: this.res
        }
        this.req.context = context;
    };
  
    success(httpCode, respondBody) {
        assert.equal(httpCode, res.httpStatus, 'Http status is mismatch');
        assert.equal(respondBody, res.body, 'Response body is mismatch');
    }

};
module.exports = MockControllerContext;