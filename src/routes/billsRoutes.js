const express = require('express');
const { getBillbyGroupId, addBill } = require('../controller/billsControler');
const { validateToken } = require('../middleware');
// -------------------------------------

const billsRoute = express.Router();

// -------------------------------------
billsRoute.get('/bills/:group_id', validateToken, getBillbyGroupId);
// -------------------------------------
billsRoute.post('/bills', validateToken, addBill);
// -------------------------------------
module.exports = billsRoute;
