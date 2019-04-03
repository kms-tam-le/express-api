const { HTTPCode } = require('../consts/HTTPCode');
const main = require('./mainController');

exports.home = (req, res) => {
    main.process(req, console.log, 'Entering Home Controller...', HTTPCode.OK);
  };