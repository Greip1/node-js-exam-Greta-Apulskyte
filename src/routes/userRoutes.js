const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../config');
const { validateUser } = require('../middleWare');
const { getUsers, regUser } = require('../controller/userController');

// -------------------------------
const userRoute = express.Router();

// -----------------------------

userRoute.get('/users', getUsers);
// ------------------------------
userRoute.post('/register', validateUser, regUser);

// -------------------------------

// userRoute.post('/login', validateUser, async (req, res) => {
//   const { email, password } = req.body;
//   const foundUser = await findUserByEmail(email);
//   if (!foundUser) {
//     res.status(400).json('email or password not found (email)');
//     return;
//   }
//   if (!bcrypt.compareSync(password, foundUser.password)) {
//     res.status(400).json('email or password not found (pass)');
//     return;
//   }
//   const payload = { usersId: foundUser.id };
//   const token = jwt.sign(payload, jwtSecret, { expiresIn: '2h' });
//   res.json({ success: true, token });
// });

// -----------------------------

// ----------------------------
module.exports = userRoute;
