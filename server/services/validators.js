const { body } = require('express-validator')
const validators = {
    userValidator: [
        body('login').trim().isEmail().normalizeEmail(),
        body('password').not().isEmpty().trim()
    ]
}

module.exports = validators