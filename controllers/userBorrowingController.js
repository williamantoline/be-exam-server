const model = require("../models/index");
const User = model.users;
const Book = model.books;
const Category = model.categories;
const Borrowing = model.borrowings;
const notification = require("../utils/notification");

exports.index = async (req, res) => {
    try {
        const borrowings = await Borrowing.findAll({
            where: {
                userId: req.user.id
            },
            include: [
                {
                    model: Book,
                    as: 'book',
                    attributes: { exclude: ['categoryId'] },
                    include: {
                        model: Category,
                        as: 'category',
                    }
                },
                {
                    model: User,
                    as: 'user',
                }
            ]
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
        const { bookId } = req.body;
        const book = await Book.findOne({
            where: {
                id: bookId,
            }
        })
        if(!book){
            return res.status(404).json({
                message: "Not found"
            })
        }
        const borrowing = await Borrowing.create({
            status: "Requested",
            userId: req.user.id, 
            bookId: bookId,
        });

        book.isAvailable = false
        await book.save();

        notification.notify("success", "Store Borrowing Success", "");
        res.status(201).json({
            message: "Store Borrowing success",
            data: borrowing,
        });

    } catch (err) {
        if (err) console.log(err);
        res.status(500).end()
    }
}

exports.cancel = async (req, res) => {
    try{
        const borrowing = await Borrowing.findOne({
            where: {
                id: req.params.id,
            }
        })
        const book = await Book.findOne({
            where:{
                id: borrowing.bookId,
            }
        })
        book.isAvailable = true;
        await book.save();
        borrowing.status = "Canceled";
        await borrowing.save();
        notification.notify("success", "Cancel Borrowing Success", "");

		res.status(200).json({
			message: "Cancel Borrowing success"
		});
    } catch (err) {
        if(err) console.log(err)
        res.status(500).end()
    }
}