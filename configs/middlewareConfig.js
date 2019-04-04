const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require('body-parser');

const initMiddleware = require('../middlewares/initMiddleware');

exports.APP_MIDDLEWARES = [
    {
        name: 'INIT', 
        method: initMiddleware.init,
        args: 'DEFAULT' //Get default args
    },
    {
        name: 'BODY_PARSER-JSON',
        method: bodyParser.json,
        args: null
    },
    {
        name: 'BODY_PARSER-JSON-ENCODE',
        method: bodyParser.urlencoded,
        args: { extended: true }
    },
    {
        name: 'CORS',
        method: cors,
        args: null
    },
    {
        name: 'MORGAN',
        method: morgan,
        args: 'common'
    },
    {
        name: 'HELMET',
        method: helmet,
        args: null
    }
];
