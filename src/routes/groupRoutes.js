const express = require('express');
const getAllGroups = require('../controller/groupController');
const { validateToken } = require('../middleWare');

const groupRoute = express.Router();

groupRoute.get('/groups', validateToken, getAllGroups);

module.exports = groupRoute;
