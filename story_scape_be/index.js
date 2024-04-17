require('dotenv').config();
const express = require('express')
const server = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./configuration/mongoose')
const port = 8000

server.use(cors())
// Use body parser to extract data from request body
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json({ limit: '10mb' }))
// Expose static files 
server.use(express.static(__dirname));

//Import routes
server.use('/',require('./routes'))

/**
 * Listen on a port
 */
server.listen(port,(err)=>
{if(err)
    console.log("Error in creating server ",err)
console.log(`Server running on port ${port}`)
})
