const bcrypt = require('bcryptjs');

const saltRound = 10;

exports.hash = async (plainText, salt) => {
  const round = salt || saltRound;
  const hashed = await new Promise((resolve, reject) => {
    bcrypt.hash(plainText, round, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
  return hashed;
};

exports.compare = async (plainText, hash) => {
  const match = await new Promise((resolve, reject) => {
    bcrypt.compare(plainText, hash, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
  return match;
};
