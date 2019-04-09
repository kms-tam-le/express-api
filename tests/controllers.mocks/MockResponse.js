class MockResponse {
    constructor() {
    };

    status(httpCode) {
        this.httpStatus = httpCode;
        return this;
    };
    send(object) {
        this.body = object;
        return this;
    }
};
module.exports = MockResponse;