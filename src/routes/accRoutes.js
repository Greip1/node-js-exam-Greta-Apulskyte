const express = require('express');
const { getAccountJoinGroup, addUserToAccount } = require('../controller/accController');
const { validateToken } = require('../middleware');

const accountRoute = express.Router();

accountRoute.get('/accounts', validateToken, getAccountJoinGroup);

accountRoute.post('/accounts', validateToken, addUserToAccount);

module.exports = accountRoute;
