const { check, validationResult } = require('express-validator');

exports.validateBook = [
    check('title')
        .notEmpty()
        .withMessage('Title is required').bail(),
    check('author')
        .notEmpty()
        .withMessage('Author name is required').bail()
        .isLength({ min: 2, max: 255 })
        .withMessage('Author name must have a minimum length of 2').bail()
        .isAlpha('en-US', {ignore: '\s'})
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

