const { addBillDb, getBillbyGroupIdDb } = require('../model/billsModel');

// ------------------------------
async function getBillbyGroupId(req, res) {
  const { group_id } = req.params;
  //   console.log(''cia group_id ===,group_id);
  try {
    const billArr = await getBillbyGroupIdDb(group_id);
    res.json(billArr);
  } catch (error) {
    console.log('Error in get getBillbyGroupId ===', error);
    res.sendStatus(500);
  }
}

async function addBill(req, res) {
  const { group_id } = req.query;
  const { amount, description } = req.body;

  console.log('group id got from token', group_id, amount, description);

  try {
    const saveRes = await addBillDb(group_id, amount, description);
    if (saveRes.affectedRows === 1) {
      res.sendStatus(201);
      return;
    }
    res.status(400).json('Error in adding bill, no bill was added');
  } catch (error) {
    console.log('Error in post/bill ===', error);
    // if (error.code === 'ER_DUP_ENTRY') {
    //   res.status(400).json('user alredy exists');
    //   return;
    // }

    res.sendStatus(500);
  }
}

// -----------------------------
module.exports = {
  getBillbyGroupId,
  addBill,
};
