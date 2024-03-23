/**
 * Import mongoose library
 */
const mongoose = require('mongoose')
/**
 * Connect to mongodb
 */
const DB_URL = process.env.DATABASE_URL
mongoose.connect(DB_URL,{  useNewUrlParser: true,
useUnifiedTopology: true })
const db = mongoose.connection

/**
 * Logs error if connection is unsuccessful
 */
db.on('error',(err)=>console.log('Error ',err.message))
/**
 * Logs for successful connection
 */
db.once('open',()=>console.log("Connection to db established"))