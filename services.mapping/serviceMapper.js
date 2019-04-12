const defaultMapper = require('./defaultMapper');

const getDtoKey = (mapper, key) => {
  const customMapper = mapper.customMapper() || [];
  const customMapKey = customMapper.find(element => element.dbField === key);
  return customMapKey ? customMapKey.dtoField : key;
};

const convertToDtoObject = (dbObject, mapper) => {
  const selectedMapper = mapper || defaultMapper;
  const excludeFields = selectedMapper.excludeDtoFields() || [];

  const dtoObject = {};
  Object.keys(dbObject)
    .filter(key => !excludeFields.includes(key))
    .forEach((key) => {
      const dtoKey = getDtoKey(selectedMapper, key);
      dtoObject[dtoKey] = dbObject[key];
    });
  return dtoObject;
};

exports.toDto = (dbObject, mapper) => convertToDtoObject(element, mapper);
exports.toDtos = (dbArray, mapper) => dbArray.map(element => convertToDtoObject(element, mapper));
