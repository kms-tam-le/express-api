const defaultMapper = require('./defaultMapper');

const getDtoKey = (mapper, key) => {
  const customMapper = mapper.customMapper() || [];
  const customMapKey = customMapper.find(element => element.dbField === key);
  return customMapKey ? customMapKey.dtoField : key;
};

const getDbKey = (mapper, key) => {
  const customMapper = mapper.customMapper() || [];
  const customMapKey = customMapper.find(element => element.dtoField === key);
  return customMapKey ? customMapKey.dbField : key;
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

const convertToDbObject = (dto, mapper) => {
  const selectedMapper = mapper || defaultMapper;
  const excludeFields = selectedMapper.excludeDBFields() || [];

  const dbObject = {};
  Object.keys(dto)
    .filter(key => !excludeFields.includes(key))
    .forEach((key) => {
      const dbKey = getDbKey(selectedMapper, key);
      dbObject[dbKey] = dto[key];
    });
  return dbObject;
};

exports.toDto = (dbObject, mapper) => convertToDtoObject(element, mapper);
exports.toDtos = (dbArray, mapper) => dbArray.map(element => convertToDtoObject(element, mapper));
exports.toEntity = (dbObject, mapper) => convertToDbObject(dbObject, mapper);
exports.toEntities = (dbArray, mapper) => dbArray.map(item => convertToDbObject(item, mapper));
