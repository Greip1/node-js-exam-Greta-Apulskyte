require('dotenv').config();
const bcrypt = require('bcryptjs');

// =======================================
function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}
// =======================================

function passwordsMatch(givenPassword, hashedStored) {
  return bcrypt.compareSync(givenPassword, hashedStored);
}
// =======================================

function generateToken(payload) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error('generateJwtToken no secret');
  return jwt.sign(payload, jwtSecret, { expiresIn: '2h' });
}
module.exports = {
  hashPassword,
  passwordsMatch,
  generateToken,
};
