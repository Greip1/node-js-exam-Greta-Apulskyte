const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

// ------------------------------------------------------
async function validateUser(req, res, next) {
  const schema = Joi.object({
    full_name: Joi.string().trim().min(5).required(),
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().trim().min(5).max(10).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync error ===', error);
    res.status(400).json(error.details);
  }
}
// --------------------------------------------------------
async function validateToken(req, res, next) {
  const tokenFromHeaders = req.headers.authorization?.split(' ')[1];

  if (!tokenFromHeaders) {
    res.status(401).json({
      success: false,
      error: 'nera tokeno',
    });
    return;
  }
  try {
    const tokenPayload = jwt.verify(tokenFromHeaders, jwtSecret);
    // console.log('tokenPayload', tokenPayload);
    const usersId = tokenPayload.usersId;
    // budas perduoti userId i tolimesne funkcija
    req.usersId = usersId;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      error: 'blogas tokenas',
    });
  }
}
// ---------------------------------------------------------
// --------------------------------------------------------
module.exports = {
  validateUser,
  validateToken,
};
