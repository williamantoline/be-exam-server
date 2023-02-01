const sharp = require('sharp');
const path = require('path')
const fs = require('fs')
const model = require("../models/index");
const Book = model.books;
const Category = model.categories;

exports.index = async (req, res) => {
    try {
        const books = await Book.findAll({
            attributes: { exclude: ['categoryId'] },
            include: {
                model: Category,
                as: 'category',
            }
        })
        return res.status(200).json({
            data: books,
        });
    } catch (err) {
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
    try{
        const { title, author, publisher, description, page, language, stock, categoryId } = req.body;
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
            stock: stock,
            image: 'public/compressed/'+img.split('.')[0]+'.png',
            categoryId: categoryId
        })

        res.status(201).json({
            message: "Store Book success",
            data: book,
        });

    } catch (err) {
        console.log(err)
        res.status(500).end();
    }
}

exports.update = async (req, res) => {
    try{
        const { title, author, publisher, description, page, language, stock, categoryId } = req.body;
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
            stock: stock,
            image: image,
            categoryId: categoryId
        })
        await book.save();

        res.status(201).json({
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