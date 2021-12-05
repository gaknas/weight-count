const express = require('express')
const app = express()
const { userValidator } = require('./services/validators')
const UserController = require('./controllers/users-controller')
const { verifyToken } = require('./services/auth-service')

app.use(express.json())

app.get('/ping', (req, res) => {
    res.send('pong')
})

app.get('/getdata', verifyToken, UserController.getdata)

app.post('/testverify', userValidator, verifyToken, (req, res) => {
    res.json({id: req.userId})
})

app.post('/chngdata', verifyToken, UserController.chngdata)

app.post('/api/signup', userValidator, UserController.create)

app.post('/api/login',  userValidator, UserController.login)


app.listen(4000)