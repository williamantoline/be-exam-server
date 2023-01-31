const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require("../models/index");

const getUser = async (email) => {
  const user = await model.users.findOne({
    where: {
      email: email
    }
  });
  return user;
}

const cookieJwtAuth = (req, res) => {
  const token = req.headers.authorization;
  const user = jwt.verify(token, process.env.JWT_KEY);
  if(!token){
    return res.json({tokenStatus: false}).status(200);
  }else{
    return res.json({tokenStatus: true, role: user.role}).status(200);
  }
}

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log("abc")
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, password) => {
      if(err){
        return res.send("Gagal Menambahkan Data User").status(400);
      }
      if(password){
        await model.users.create({name, email, password, role: role || true});
        return res.send("Berhasil Menambahkan Data User").status(200);
      }
    });
  } catch (err) {
    return res.status(500).end();
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  let user = await getUser(email);

  if(!user){
    return res.status(403).json({
      message: 'invalid credentials',
      error: "invalid login",
    })
  }

  const status = await bcrypt.compare(password, user.password)
  if(!status){
    return res.status(403).json({
      message: 'invalid credentials',
      error: 'invalid login'
    })
  }

  const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, { expiresIn: "24h" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "None"
  });

  return res.json({token: token, role: user.role});
  
  } catch (err) {
    res.status(500).end();
  }
}

// const revoke = (req, res) => {
//   return res.status(204).end();
// }

// const me = async (req, res) => {
//   return res.json("me");
// }

module.exports = { register, login, cookieJwtAuth }