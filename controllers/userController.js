const model = require("../models/index");
const User = model.users;

exports.index = async (req, res) => {
    try {
        if(!req.user.is_admin){
            res.status(401).json({
                message: "Unauthorized",
            });
        }
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
        })
        return res.status(200).json({
            data: users,
        });
    } catch (err) {
        return res.status(500).end();
    }
}

exports.show = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        },
        attributes: { exclude: ['password'] },
    })
    if (!user) {
        return res.status(404).json({
            message: "Not found"
        })
    }
    return res.status(200).json({
        data: user,
    });
}