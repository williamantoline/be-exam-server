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
            allowNull: true,
        },
        description: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        page: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        language: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        isAvailable: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING(255),
            allowNull: false,
        }
    });
    return Book;
}