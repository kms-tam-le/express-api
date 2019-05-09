
const baseRepository = require('./baseRepository');

const name = 'user';
const { getCollection: collection } = baseRepository;

exports.save = async (user, context) => baseRepository.save(collection(context, name), user);
exports.findAll = async context => baseRepository.findAll(collection(context, name));
exports.find = async (query, context) => baseRepository.findArray(collection(context, name), query);
exports.findOne = async (query, context) => baseRepository.findOne(collection(context,
  name), query);
