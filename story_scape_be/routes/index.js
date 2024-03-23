const express = require('express')
const routes  = express.Router()

routes.use('/user',require('./user.routes'))
routes.use('/post',require('./post.routes'))

module.exports=routes