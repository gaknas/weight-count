const { User } = require('../models')
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const validateDecorator = require('../services/validate-decorator')
const { createToken } = require('../services/auth-service')

function create(req, res, next) {
//    res.send(req.body)
    User.findOne({where: {login: req.body.login}}).then(user => {
        if (user) {
            return Promise.reject({statusCode: 422, message: "Login already in use"})
        } else {
            const {login, password} = req.body
            const salt = bcryptjs.genSaltSync(10)
            passwordHash = bcryptjs.hashSync(password, salt)
            return User.create({login, password: passwordHash})
        }
    })
    .then(user => {
        res.json(user)
    })
    .catch(error => {
        res.status(error.statusCode || 400).json({errors: error.message})
    })
}

function login(req, res, next) {
    const loginUser = req.body
    User.findOne({where: {login: loginUser.login}}).then((usrdata) => User.login(loginUser, usrdata)).then(createToken).then(token => {
        res.json({token})
    }).catch(error => {
        res.status(401).json({ message: error.message })
    })
}

function chngdata(req, res, next) {
     User.update({usrdata: JSON.stringify(req.body.usrdata)}, {
        where: {
            id: req.userId
        }
    }).then((result) => {res.json(result)}).catch(error => {
        res.status(401).json({ message: error.message })
    })
}

function getdata(req, res, next) {
    User.findOne({where: {id: req.userId}}).then((usrdata) => res.json({ usrdata: usrdata.usrdata })).catch(error => {
        res.status(401).json({ message: error.message })
    })
}

module.exports = validateDecorator({
    create,
    login,
    chngdata,
    getdata
})