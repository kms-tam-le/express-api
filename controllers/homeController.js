const { HTTPCode } = require('../consts/HTTPCode');
const main = require('./mainController');

exports.home = (req) => {
  main.process(req, console.log, 'Entering Home Controller...', HTTPCode.OK);
};
