const express = require('express')
const passport = require('passport')
const routes  = express.Router()
const postController = require('../controllers/post.controller')

routes.post('/create',postController.createPost)
routes.get('/all-posts',postController.getAllPost)
routes.get('/:id',postController.getPostById)
routes.get('/delete/:id',postController.deleteById)
routes.post('/edit/:id',postController.editPostById)

module.exports=routes