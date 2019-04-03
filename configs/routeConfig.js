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
    USER: '/user',
    AUTHENTICATION: '/authentication'
}

exports.AUTHENTICATION_ENPOINTS = [
    {
        url: END_POINTS.AUTHENTICATION,
        authenticate: usernamePasswordAuthProvider.authenticate
    }
]

exports.GET_ENDPOINTS= [
    {
        url: END_POINTS.HOME,
        controller: homeController.home
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
        url: END_POINTS.USER,
        controller: userController.get
    }
];

exports.POST_ENDPOINTS = [
    {
        url: END_POINTS.SYNC,
        controller: syncController.sync
    },
    {
        url: END_POINTS.USER,
        controller: userController.post,
        validationSchema: UserSchema.schema
    }
]
