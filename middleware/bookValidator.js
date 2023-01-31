const { check, validationResult } = require('express-validator');

exports.validateBook = [
    check('title')
        .notEmpty()
        .withMessage('Name is required').bail(),
    check('author')
        .notEmpty()
        .withMessage('author is required').bail()
        .isAlpha()
        .withMessage("Author name should contain only letters").bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!req.file){
            const err = {
                msg: 'Image is required',
            }; 
            errors.errors.push(err);
        }
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    },
]

