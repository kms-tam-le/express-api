/*Import controllers */
const homeController = require('../controllers/homeController');
const syncController = require('../controllers/syncController');
const errorController = require('../controllers/errorController');
const userController = require('../controllers/userController');

/*Import validation schema */
const UserSchema = require('../dtos.schemas/UserSchema');

/*Import aunthentication provider */
const usernamePasswordAuthProvider = require('../auth.providers/usernamePasswordAuthProvider');

const END_POINTS = {
    HOME: '/',
    ERROR: '/error',
    ERROR_THROWN: '/error/thrown',
    SYNC: '/sync',
    Users: '/users',
    AUTHENTICATION: '/authentication'
};

exports.END_POINTS = END_POINTS;

exports.AUTHENTICATION_ENPOINTS = [
    {
        url: END_POINTS.AUTHENTICATION,
        authenticate: usernamePasswordAuthProvider.authenticate
    }
]

exports.GET_ENDPOINTS= [
    {
        url: END_POINTS.HOME,
        controller: homeController.home,
        authenticate: false
    },
    {
        url: END_POINTS.ERROR_THROWN,
        controller: errorController.throwError
    },
    {
        url: END_POINTS.ERROR,
        controller: errorController.error
    },
    {
        url: END_POINTS.Users,
        controller: userController.get,
        permissions: ['Admin']
    }
];

exports.POST_ENDPOINTS = [
    {
        url: END_POINTS.SYNC,
        controller: syncController.sync,
        authenticate: false
    },
    {
        url: END_POINTS.Users,
        controller: userController.post,
        validationSchema: UserSchema.schema
    }
]
