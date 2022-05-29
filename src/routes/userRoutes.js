const express = require('express');
const { validateUser } = require('../middleWare');
const { getUsers, regUser, loginUser } = require('../controller/userController');

const userRoute = express.Router();

userRoute.get('/users', getUsers);

userRoute.post('/register', validateUser, regUser);

userRoute.post('/login', loginUser);

module.exports = userRoute;
