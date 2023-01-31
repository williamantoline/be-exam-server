const model = require("../models/index");
const Book = model.books;

exports.index = async (req, res) => {
    try {
        const books = await Book.findAll();
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
        }
    })
    if(!book){
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
        const { title, author, publisher, description, page, language, stock } = req.body;
        const image = req.file.path;

        const book = await Book.create({
            title: title,
            author: author,
            publisher: publisher,
            description: description,
            page: page,
            language: language,
            stock: stock,
            image: image
        })

        res.status(201).json({
            message: "Store Book success",
            data: book,
        });

    } catch (err) {
        if(err) throw err
        res.status(500).end();
    }
}