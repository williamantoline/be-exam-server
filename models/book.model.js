const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        author: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        publisher: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        page: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        language: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        stock: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING(255),
            allowNull: false,
        }
    });
    return Book;
}