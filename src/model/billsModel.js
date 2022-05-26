const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');
const { executeDb } = require('../utils/helper');

// ===================================================

function getBillbyGroupIdDb(group_id) {
  const sql = 'SELECT * FROM bills WHERE group_id=?';
  return executeDb(sql, [group_id]);
}
// ===================================================

function addBillDb(group_id, amount, description) {
  const sql = 'INSERT INTO bills (group_id, amount, description) VALUES (?, ?, ?)';
  return executeDb(sql, [group_id, amount, description]);
}

// ===================================================
module.exports = {
  getBillbyGroupIdDb,
  addBillDb,
};
