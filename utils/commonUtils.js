const fs = require('fs');
const path = require('path');

exports.loadObjectsFromFolder = (dir) => {
  const objArray = fs
    .readdirSync(dir)
    .filter(file => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
    .map((file) => {
      const filePath = path.join(dir, file);
      // eslint-disable-next-line
      return require(filePath);
    });

  return objArray;
};

exports.removeFields = (obj, fields = []) => {
  fields.forEach((fieldName) => {
    // eslint-disable-next-line
    delete obj[fieldName];
  });
};
