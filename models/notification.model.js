const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define("notification", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        type: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        subject: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        body: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        read_at: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    });
    return Notification;
}