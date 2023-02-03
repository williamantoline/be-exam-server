const model = require("../models/index");
const User = model.users
const Notification = model.notifications

exports.index = async (req, res) => {
    try {
        const notifications = await Notification.findAll()
        return res.status(200).json({
            data: notifications,
        });
    } catch (err) {
        return res.status(500).end();
    }
}

exports.read = async (req, res) => {
    try{
        const notifications = await Notification.findAll();
        const readAt = new Date().toISOString()
        for(const notif of notifications){
            notif.read_at = readAt;
            await notif.save();
        }
        res.status(201).json({
			message: "Update Read success",
			data: notifications,
		});
    } catch (err) {
        return res.status(500).end()
    }
}

exports.clear = async (req, res) => {
    try{
        await Notification.destroy();
        res.status(200).json({
			message: "Clear Notifications success"
		});
    } catch (err) {
        return res.status(500).end()
    }
}

