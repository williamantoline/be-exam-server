const model = require("../models/index");
const Book = model.books;
const Category = model.categories;

exports.index = async (req, res) => {
    try {
        const books = await Book.findAll({
            attributes: { exclude: ['categoryId'] },
            include: {
                model: Category,
                as: 'category'
            }
        })
        return res.status(200).json({
            data: books,
        });
    } catch (err) {
        console.log(err)
        return res.status(500).end();
    }
}

exports.show = async (req, res) => {
    const book = await Book.findOne({
        where: {
            id: req.params.id
        },
        include: Category,
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
        const { title, author, publisher, description, page, language, stock, categoryId } = req.body;
        const image = req.file.path;

        const book = await Book.create({
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

        res.status(201).json({
            message: "Store Book success",
            data: book,
        });

    } catch (err) {
        res.status(500).end();
    }
}

exports.addCategory = async (req, res) => {
    try{
        const { category } = req.body;
        const cat = await Category.create({category});

        res.status(201).json({
            message: "Store Category success",
            data: cat,
        });

    } catch (err){
        res.status(500).end()
    }
}