const bcrypt = require('bcrypt');

exports.generateErrorJSON = (message, details) => {
  return { error: message, details }
}

exports.generateHash = password => {
  return bcrypt.hashSync(password, 8);
}

exports.matchHash = (val1, val2) => {
  return bcrypt.compareSync(val1, val2);
}