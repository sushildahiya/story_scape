const express = require('express')
const passport = require('passport')
const routes  = express.Router()
const postController = require('../controllers/post.controller')

routes.post('/create',postController.createPost)
routes.get('/all-posts',postController.getAllPost)
routes.get('/:id',postController.getPostById)

module.exports=routes