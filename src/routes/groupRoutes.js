const express = require('express');
const { validateToken } = require('../middleWare');
const { getAllGroups, postAllGroups } = require('../controller/groupController');

const groupRoute = express.Router();

groupRoute.get('/groups', validateToken, getAllGroups);

groupRoute.post('/groups', validateToken, postAllGroups);

module.exports = groupRoute;
