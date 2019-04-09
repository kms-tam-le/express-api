const Joi = require('joi');

const { HTTPCode } = require('../consts/HTTPCode');
const main = require('./mainController');

const userService = require('../services/userService');
exports.get = (req, res, next) => {
    main.process(req, userService.get, null , HTTPCode.OK);
};

exports.post = (req, res, next) => {
    console.log(main);
    const user = req.body;
    main.process(req, userService.post, user , HTTPCode.CREATED);
};