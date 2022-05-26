const { executeDb } = require('../utils/helper');

// -------------------------------

function addAccountDb(group_id, user_id) {
  const sql = 'INSERT INTO accounts (group_id, user_id) VALUES (?, ?)';
  return executeDb(sql, [group_id, user_id]);
}
function accountsJoinGroupsDb(id) {
  const sql =
    'SELECT * FROM accounts LEFT JOIN groups ON accounts.group_id=groups.id WHERE user_id = ?';
  return executeDb(sql, [id]);
}

// ---------------------------------------
module.exports = {
  addAccountDb,
  accountsJoinGroupsDb,
};
