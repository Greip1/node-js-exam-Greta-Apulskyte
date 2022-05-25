require('dotenv').config();
const bcrypt = require('bcryptjs');

// --------------------------------
function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

// ------------------------------
module.exports = {
  hashPassword,
};
