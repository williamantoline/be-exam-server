const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Borrowing = sequelize.define("borrowing", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        status: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        }
    });
    return Borrowing;
}