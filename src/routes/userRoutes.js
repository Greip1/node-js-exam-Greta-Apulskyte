const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../config');
const { validateUser } = require('../middleWare');
const { getUsers, regUser, loginUser } = require('../controller/userController');

// ================================
const userRoute = express.Router();

// ================================

userRoute.get('/users', getUsers);
// ================================
userRoute.post('/register', validateUser, regUser);

// ================================-
userRoute.post('/login', validateUser, loginUser);

// ================================

// ================================
module.exports = userRoute;
