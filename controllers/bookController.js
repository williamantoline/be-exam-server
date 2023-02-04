const sharp = require('sharp');
const path = require('path')
const model = require("../models/index");
const Book = model.books;
const Category = model.categories;

exports.index = async (req, res) => {
    try {
        const params = req.query;
        console.log(params);
        let books = [];
        if (req.query.isAvailable) {
            books = await Book.findAll({
                where: {
                    isAvailable: true,
                },
                attributes: { exclude: ['categoryId'] },
                include: {
                    model: Category,
                    as: 'category',
                }
            });
        } else {
            books = await Book.findAll({
                attributes: { exclude: ['categoryId'] },
                include: {
                    model: Category,
                    as: 'category',
                }
            })
        }
        return res.status(200).json({
            data: books,
        });
    } catch (err) {
        throw err;
        return res.status(500).end();
    }
}

exports.show = async (req, res) => {
    const book = await Book.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Category,
            as: 'category',
        },
    })
    if (!book) {
        return res.status(404).json({
            message: "Not found"
        })
    }
    return res.status(200).json({
        data: book,
    });
}

exports.store = async (req, res) => {
    console.log(req.body);
    try{
        const { title, author, publisher, description, page, language, categoryId } = req.body;
        const imagePath = req.file.path;
        const {filename: img} = req.file;
        await sharp(imagePath)
        .resize({
            width: 500,
            height: 750,
        })
        .toFormat('png', {quality: 80})
        .toFile(
            path.resolve(req.file.destination,'../compressed',img.split('.')[0]+'.png')
        )

        const book = await Book.create({
            title: title,
            author: author,
            publisher: publisher,
            description: description,
            page: page,
            language: language,
            image: 'public/compressed/'+img.split('.')[0]+'.png',
            categoryId: categoryId
        })

        res.status(201).json({
            message: "Store Book success",
            data: book,
        });

    } catch (err) {
        res.status(500).end();
    }
}

exports.update = async (req, res) => {
    try{
        const { title, author, publisher, description, page, language, categoryId } = req.body;
        const image = req.file.path;
        const book = await Book.findOne({
            where: {
                id: req.params.id
            }
        })

        book.set({
            title: title,
            author: author,
            publisher: publisher,
            description: description,
            page: page,
            language: language,
            image: image,
            categoryId: categoryId
        })
        await book.save();

        res.status(200).json({
			message: "Update Category success",
			data: book,
		});

    } catch (err) {
        res.status(500).end();
    }
}

exports.destroy = async (req, res) => {
    try{
        const { id } = req.params;
        await Book.destroy({
            where: {
                id: id,
            }
        });
        res.status(200).json({
			message: "Delete Book success"
		});
    } catch (err) {
        res.status(500).end();
    }
}