const express = require('express')
const port = 8000
const server = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./configuration/mongoose')

server.use(cors())
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(express.static(__dirname));

server.use('/',require('./routes'))

server.listen(port,(err)=>
{if(err)
    console.log("Error in creating server ",err)
console.log(`Server running on port ${port}`)
})