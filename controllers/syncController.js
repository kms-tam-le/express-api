
const { HTTPCode } = require('../consts/HTTPCode');
const main = require('./mainController');

exports.sync = (req, res, next) => {
  const syncService = require('../services/syncService');
  const data = 'Successed to call /sync'
  main.process(req, syncService.sync, data , HTTPCode.OK);
};