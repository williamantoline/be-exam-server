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
  try {
    const token = req.headers.authorization;
    if(!token || token == 'undefined'){
      return res.json({
        tokenStatus: false
      }).status(200);
    }

    const user = jwt.verify(token, process.env.JWT_KEY);
    return res.json({tokenStatus: true, is_admin: user.is_admin, user: user}).status(200);
    
  } catch (err) {
    throw err;
  }

}

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, password) => {
      if(err){
        return res.send("Gagal Menambahkan Data User").status(400);
      }
      if(password){
        await model.users.create({name, email, password, is_admin: false});
        return res.send("Berhasil Menambahkan Data User").status(200);
      }
    });
  } catch (err) {
    console.log(err)
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

  return res.json({token: token, is_admin: user.is_admin});
  
  } catch (err) {
    res.status(500).end();
  }
}

module.exports = { register, login, cookieJwtAuth }