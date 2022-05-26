const express = require('express');
const { getBillbyGroupId } = require('../controller/billsControler');
const { validateToken } = require('../middleware');

groupRoute.get('/groups/:group_id', validateToken, getBillbyGroupId);

// is accounts kur yra user ir group id

module.exports = groupRoute;
