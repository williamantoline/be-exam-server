const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.books = require("./book.model.js")(sequelize, Sequelize);
db.categories = require("./category.model.js")(sequelize, Sequelize);
db.notifications = require("./notification.model.js")(sequelize, Sequelize);
db.borrowings = require("./borrowing.model.js")(sequelize, Sequelize);

db.categories.hasMany(db.books, {
    as: "books",
});

db.books.belongsTo(db.categories, {
    foreignKey: "categoryId",
    as: "category",
});

db.users.hasMany(db.notifications, {
    as: "notifications",
})

db.notifications.belongsTo(db.users, {
    as: "user",
})

db.users.hasMany(db.borrowings, {
    as: "borrowings",
})

db.borrowings.belongsTo(db.users, {
    foreignKey: "userId",
    as: 'user'
})

db.borrowings.belongsTo(db.books, {
    foreignKey: "bookId",
    as: 'book'
})

module.exports = db;