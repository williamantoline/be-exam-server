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
    return res.json({tokenStatus: true, is_admin: user.is_admin, user: user}).status(200);
  }
}

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("abc")
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

// const revoke = (req, res) => {
//   return res.status(204).end();
// }

// const me = async (req, res) => {
//   return res.json("me");
// }

const editProfile = async (req, res) => {
  // console.log(req.body);
  try {
    const token = req.headers.authorization;
    const user_ = await jwt.verify(token, process.env.JWT_KEY);
    console.log(user_);
    const user = await model.users.findOne({
      where: {
        id: user_.id,
      }
    });
    console.log(user);
    const { name, email, password } = req.body;
    console.log(name, email, password);

    // user.name = name;
    // user.email = email;
    // user.password = password;
    // user.save();

    model.users.updateOne({
      name: name,
      email: email,
      password: password,
    }, {
      where: {
        id: user_.id,
      }
    });

    // user.set({
    //   name: name,
    //   email: email,
    //   password: password
    // });

    return res.status(200).json({
      message: "edit profile success",
    });
    
  } catch (err) {
    console.log(err)
    return res.status(500).end();
  }
}

module.exports = { register, login, cookieJwtAuth, editProfile }