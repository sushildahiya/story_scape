const express = require('express')
const passport = require('passport')
const routes  = express.Router()
const userController = require('../controllers/user.controller')
routes.post('/create-user',userController.createUser)
routes.post('/user-avater',userController.uploadAvatar)
routes.post('/unqiue-email',userController.emailValidation)
routes.post('/create-session',userController.createSession)
module.exports=routes