const { body } = require('express-validator');



const registorValidator  = [
    body('firstName','First name is not empty ').notEmpty().trim(),
    body('lastName','Last name is not empty ').notEmpty().trim(),
    body('email','Email is not correct format').notEmpty().isEmail().normalizeEmail().trim(),
    body('password','Password must be between 8 - 20 characters').notEmpty().trim().isLength({
        max: 20 , min: 8
    })
]

const loginValidator = [
    body('email','Email is not correct format').isEmail().normalizeEmail().trim(),
    body('password','Password must be between 8 - 20 characters').notEmpty().trim().isLength({
        min: 8 , max: 20
    })
]
const refreshValidator = [
    body('refreshToken','refreshToken is not empty').notEmpty()
]
const validator = {
    refreshValidator,
    registorValidator,
    loginValidator
}
module.exports = validator;