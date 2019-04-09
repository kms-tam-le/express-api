const sinon = require('sinon');

const userController = require("../../controllers/userController");
const userService = require("../../services/userService");
const MockControllerContext = require ("../controllers.mocks/MockControllerContext");
const { HTTPCode } = require('../../consts/HTTPCode');

const mockService = sinon.stub(userService, 'post');
const httpCode = HTTPCode.OK;
const DUMMY_REQ_BODY = {
    data: 'Request body content'
}
let context = new MockControllerContext(DUMMY_REQ_BODY);

describe('userController.post', () => {
    beforeEach((done) => {
        done();  
    });
    it('should create User successfully', (done) => {
        const {req, res } = context;

        mockService.returns(() => {
            console.log('Stub main call');
            return DUMMY_REQ_BODY;
        });
        userController.post(req, res);
        done();
    });
    afterEach((done) => {
        mockService.restore();
        done();  
    });


});