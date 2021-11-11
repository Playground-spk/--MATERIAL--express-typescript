/* eslint-disable camelcase */
const path = require('path');
exports.shorthands = undefined;
const fs = require('fs');
exports.up = (pgm) => {
  const directoryPath = path.join(__dirname, '../sql/migrate/up');
  const sql = fs.readFileSync(directoryPath + '/0.sql', 'utf8');
  pgm.sql(sql);
};

exports.down = (pgm) => {
  const directoryPath = path.join(__dirname, '../sql/migrate/down');
  const sql = fs.readFileSync(directoryPath + '/0.sql', 'utf8');
  pgm.sql(sql);
};
