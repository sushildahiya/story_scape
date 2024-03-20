const express = require('express')
const routes  = express.Router()

routes.get('/',(req,res)=>{
    return res.send("ABCDE")
})
routes.use('/user',require('./user.routes'))
routes.use('/post',require('./post.routes'))


module.exports=routes