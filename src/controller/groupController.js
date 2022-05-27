const getAllGroupsDb = require('../model/groupModel');

// ------------------------------------------
async function getAllGroups(req, res) {
  try {
    const usersArr = await getAllGroupsDb();
    res.json(usersArr);
  } catch (error) {
    console.log('error in getting group route ===', error);
    res.sendStatus(500);
  }
}

module.exports = getAllGroups;
