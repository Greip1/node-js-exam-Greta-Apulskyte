const { executeDb } = require('../utils/helper');

// --------------------------
function getAllGroupsDb() {
  const sql = 'SELECT * FROM groups';
  return executeDb(sql, []);
}
module.exports = getAllGroupsDb;
