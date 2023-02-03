const model = require("../models/index");


exports.notify = async (user, type, subject, body) => {
    try {
        await model.notifications.create({
            type: type,
            subject: subject,
            body: body,
        });

    } catch (err) {
        throw err;
    }

}