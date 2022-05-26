const { addAccountDb, accountsJoinGroupsDb } = require('../model/accModel');

// ---------------------------------------------
async function addUserToAccount(req, res) {
  const { group_id, user_id } = req.body;

  const tokenFromHeaders = req.headers.authorization.split(' ')[1];

  const idFromToken = req.usersId;
  //

  console.log(group_id, user_id, tokenFromHeaders);
  // console.log('idFromtoken ====', idFromToken);

  try {
    const saveResult = await addAccountDb(group_id, idFromToken);
    if (saveResult.affectedRows === 1) {
      res.sendStatus(201);
      return;
    }
    res.status(400).json('New acc not added');
  } catch (error) {
    console.log(' Error in POST/accounts ===', error);

    res.sendStatus(500);
  }
}
// -------------------------------------

async function getAccountJoinGroup(req, res) {
  const idFromToken = req.userId;
  try {
    const accountGroupArr = await accountsJoinGroupsDb(idFromToken);
    res.json(accountGroupArr);
  } catch (error) {
    console.log('Get UserAccountJoinGroup error ===', error);
    res.sendStatus(500);
  }
}
// ----------------------
module.exports = {
  addUserToAccount,
  getAccountJoinGroup,
};