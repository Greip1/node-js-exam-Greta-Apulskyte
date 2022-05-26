const { executeDb } = require('../utils/helper');

// --------------------------
function getAllUsersDb() {
  const sql = 'SELECT * FROM users';
  return executeDb(sql, []);
}
// -----------------------------
function addUserToDb(full_name, email, password) {
  const sql = `
    INSERT INTO users(full_name, email, password)
    VALUES (?, ?)
    `;
  return executeDb(sql, [full_name, email, password]);
}
// --------------------------------------------
function registerUserDb(full_name, email, password) {
  const sql = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';
  return executeDb(sql, [full_name, email, password]);
}
// -------------------------------------------
function findUserByEmail(email) {
  const sql = 'SELECT * FROM users WHERE email = ?';
  return executeDb(sql, [email]);
}
module.exports = {
  getAllUsersDb,
  addUserToDb,
  registerUserDb,
  findUserByEmail,
  executeDb,
};
