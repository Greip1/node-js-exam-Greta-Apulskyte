const { getAllUsersDb, registerUserDb } = require('../model/usersModel');

const { hashPassword } = require('../utils/helper');
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

// ========
// async function loginUser(req, res) {}
//   const gautasEmail = req.body.email;
//   const gautasSlaptazodis = req.body.password;

//   // patikrinti ar yra toks email kaip gautas
//   const foundUserArr = await findUserByEmail(gautasEmail);
//   // nes findUserByEmail grazina visada masyva
//   const foundUser = foundUserArr[0];
//   console.log('foundUser ===', foundUser);
//   // jei nera 400 email or password not found
//   if (!foundUser) {
//     res.status(400).json('email or password not found (email)');
//     return;
//   }
//   // jei yra tikrinam ar sutampa slaptazodis
//   // bcrypt.compareSync(ivestas slaptazodis, issaugotas hashed slaptazodis)
//   if (!passWordsMatch(gautasSlaptazodis, foundUser.password)) {
//     res.status(400).json('email or password not found (pass)');
//     return;
//   }
//   // sugeneruoti jwt token
//   const payload = { userId: foundUser.id };
//   const token = generateJwtToken(payload);
//   // console.log('token ===', token);
//   res.json({ success: true, token });

// ------------------------------
module.exports = {
  getUsers,
  regUser,
};
