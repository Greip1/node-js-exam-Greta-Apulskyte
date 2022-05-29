const { executeDb } = require('../utils/helper');

// --------------------------
function getAllGroupsDb() {
  const sql = 'SELECT * FROM groups';
  return executeDb(sql, []);
}

function postGroupsDb(name) {
  const sql = 'INSERT INTO groups (name) VALUES (?)';
  return executeDb(sql, [name]);
}
module.exports = {
  getAllGroupsDb,
  postGroupsDb,
};
