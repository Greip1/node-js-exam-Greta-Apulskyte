const { getAllUsersDb, registerUserDb, findUserByEmail } = require('../model/usersModel');

const { hashPassword, passwordsMatch, generateToken } = require('../utils/helper');
// ------------------------------------------
async function getUsers(req, res) {
  try {
    const usersArr = await getAllUsersDb();
    res.json(usersArr);
  } catch (error) {
    console.log('error in getting user route ===', error);
    res.sendStatus(500);
  }
}
// ---------------------------------------
async function regUser(req, res) {
  const { full_name, email, password } = req.body;
  const newPassword = hashPassword(password);
  try {
    const savedRes = await registerUserDb(full_name, email, newPassword);
    if (savedRes.affectedRows === 1) {
      res.status(201).json('New user created');
      return;
    }
    res.status(400).json('No user was created');
  } catch (error) {
    console.log('POST /register ===', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json('This user alredy exists');
      return;
    }

    res.sendStatus(500);
  }
}

async function loginUser(req, res) {
  const gotEmail = req.body.email;
  const gotPassword = req.body.password;

  const foundUserArr = await findUserByEmail(gotEmail);
  const foundUser = foundUserArr[0];
  console.log('foundUser ===', foundUser);
  if (!foundUser) {
    res.status(400).json('This email or password was not found (email)');
    return;
  }
  if (!passwordsMatch(gotPassword, foundUser.password)) {
    res.status(400).json('This email or password was not found(password)');
    return;
  }
  const payload = { userId: foundUser.id };
  const token = generateToken(payload);
  res.json({ success: true, token });
}

// ------------------------------
module.exports = {
  getUsers,
  regUser,
  loginUser,
};
