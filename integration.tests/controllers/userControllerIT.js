//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const helper = require('./integrationTestHelper');
const setup = require('../chaiSetup');
const testApp = setup.initialTestServer();
const { END_POINTS } = require('../../configs/routeConfig');

let httpCall;

describe('/GET Users', () => {
    beforeEach((done) => {
        httpCall = testApp.get(END_POINTS.Users)
        done();  
    });
    it('should return 403 with no token', (done) => {
        helper.execute(httpCall, helper.assertNoToken, done);
    });
    it('should return 403 with damaged TOken', (done) => {
        httpCall.set('Authorization', 'invalid')
        helper.execute(httpCall, helper.assertInvalidToken, done);
    });

    it('should return 401 with no permission', (done) => {
        httpCall.set('Authorization', helper.createJWTToken());
        helper.execute(httpCall, ((res) => {
            res.should.have.status(401);
        }), done);
    });

    it('should return 200 when success', (done) => {
        httpCall.set('Authorization', helper.createJWTToken(true));
        helper.execute(httpCall, ((res) => {
            res.should.have.status(200);
        }), done);
    });


});
