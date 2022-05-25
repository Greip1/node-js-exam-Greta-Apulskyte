const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

// --------------------------
async function executeDb(sql, dataToDBArr = []) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, dataToDBArr);
    return result;
  } catch (error) {
    console.log('Error in eexecuteDb!!', error);
    throw new Error('Error in eexecuteDb!!');
  } finally {
    conn?.end();
  }
}
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
module.exports = {
  getAllUsersDb,
  addUserToDb,
  registerUserDb,
};
