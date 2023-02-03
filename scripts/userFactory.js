const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.users;
const saltRounds = 10;

const admin = {
    name: 'admin1',
	email: 'admin1@gmail.com',
	password: bcrypt.hashSync('12345678', saltRounds),
	is_admin: true
};

const user = {
    name: 'user1',
	email: 'user1@gmail.com',
	password: bcrypt.hashSync('12345678', saltRounds),
	is_admin: false
}

User.create(admin)
    .then(() => console.log('Success creating admin account'));

User.create(user)
    .then(() => console.log('Success creating user account'));