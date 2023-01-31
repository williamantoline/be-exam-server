const model = require("../models/index");
const Book = model.books;
const Category = model.categories;

exports.index = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: {
                model: [Book],
                as: 'books',
                attributes: { exclude: ['categoryId'] },
            }
        })
        return res.status(200).json({
            data: categories,
        });
    } catch (err) {
        return res.status(500).end();
    }
}

exports.show = async (req, res) => {
    const category = await Category.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: [Book],
            as: 'books',
            attributes: { exclude: ['categoryId'] }
        },
    })
    if (!category) {
        return res.status(404).json({
            message: "Not found"
        })
    }
    return res.status(200).json({
        data: category,
    });
}

exports.store = async (req, res) => {
    try{
        const { name } = req.body;
        const category = await Category.create({name});

        res.status(201).json({
            message: "Store Category success",
            data: category,
        });

    } catch (err) {
        res.status(500).end()
    }
}

exports.update = async (req, res) => {
	try{
		const { name } = req.body
		const category = await Category.findOne({
			where: {
				id: req.params.id,
			}
		})

		category.name = name;
		await category.save();

		res.status(201).json({
			message: "Update Category success",
			data: category,
		});

	} catch (err) {
		res.status(500).end()
	}
}

exports.destroy = async (req, res) => {
    try{
        await Category.destroy({
			where: {
				id: req.params.id,
			}
		})
		res.status(200).json({
			message: "Delete Category success"
		});
    } catch (err) {
        res.status(500).end()
    }
}