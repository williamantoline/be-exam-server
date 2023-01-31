const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        category: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
    });
    return Category;
}