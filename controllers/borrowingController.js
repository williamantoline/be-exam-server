const model = require("../models/index");
const User = model.users;
const Book = model.books;
const Category = model.categories;
const Borrowing = model.borrowings;

exports.index = async (req, res) => {
    try {
        const borrowings = await Borrowing.findAll({
            where: {
                userId: req.user.id,
            },
            include: {
                model: Book,
                as: 'book',
                attributes: { exclude: ['categoryId'] },
                include: {
                    model: Category,
                    as: 'category',
                }
            }
        });
        return res.status(200).json({
            data: borrowings,
        });
    } catch (err) {
        return res.status(500).end();
    }
}

exports.show = async (req, res) => {
    const borrowing = await Borrowing.findOne({
        where: {
            id: req.params.id,
            userId: req.user.id
        },
        include: {
            model: Book,
            as: 'book',
            attributes: { exclude: ['categoryId'] },
            include: {
                model: Category,
                as: 'category',
            }
        }
    })
    if (!borrowing) {
        return res.status(404).json({
            message: "Not found"
        })
    }
    return res.status(200).json({
        data: borrowing,
    });
}

exports.store = async (req, res) => {
    try{
        const { status } = req.body;
        const borrowing = await Borrowing.create({status: status, userId: req.user.id, bookId: req.body.id});

        res.status(201).json({
            message: "Store Borrowing success",
            data: borrowing,
        });

    } catch (err) {
        res.status(500).end()
    }
}

exports.destroy = async (req, res) => {
    try{
      await Borrowing.destroy({
			where: {
				id: req.params.id,
                userId: req.user.id
			}
		})
		res.status(200).json({
			message: "Delete Borrowing success"
		});
    } catch (err) {
        res.status(500).end()
    }
}