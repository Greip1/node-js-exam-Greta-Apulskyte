const { getAllGroupsDb, postGroupsDb } = require('../model/groupModel');

// ------------------------------------------
async function getAllGroups(req, res) {
  try {
    const usersArr = await getAllGroupsDb();
    res.json(usersArr);
  } catch (error) {
    // console.log('error in getting group route ===', error);
    res.sendStatus(500);
  }
}

async function postAllGroups(req, res) {
  const { name } = req.body;

  try {
    const saveResult = await postGroupsDb(name);
    if (saveResult.affectedRows === 1) {
      res.status(201).json('Group successfully added');
      return;
    }
    res.status(400).json('Error in adding new group ');
  } catch (error) {
    // console.log('POST /groups ===', error);

    res.sendStatus(500);
  }
}

module.exports = {
  getAllGroups,
  postAllGroups,
};
